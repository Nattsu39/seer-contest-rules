import { describe, test, expect } from 'vitest';
import {
  itemFilterValidator,
  validateAbilityValues,
  validateMintmark,
  validateMintmarkConfiguration,
  validatePetEffect,
} from '../index.js';
import { MintmarkInfo, MintmarkType } from 'seer-interfaces/pet/index.js';
import { MintmarkDetailRule } from 'seer-interfaces/rule-set/index.js';

const EMPTY_ABILITY = {
  hp: 0,
  atk: 0,
  def: 0,
  spAtk: 0,
  spDef: 0,
  spd: 0,
};

function createAbilityValues(hp: number = 0, atk: number = 0, def: number = 0, spAtk: number = 0, spDef: number = 0, spd: number = 0) {
  return { hp, atk, def, spAtk, spDef, spd };
}

describe('greeter function', () => {
  test('filter 测试', () => {
    const id = 888;
    expect(itemFilterValidator(id, {})).toBe(true);
    expect(itemFilterValidator(id, { include: [999] })).toBe(false);
    expect(itemFilterValidator(id, { exclude: ['888~999'] })).toBe(false);
    expect(itemFilterValidator(id, { exclude: [888] })).toBe(false);
    expect(
      itemFilterValidator(id, { include: ['700~899'], exclude: ['900~999'] }),
    ).toBe(true);
  });

  test('额外值验证测试', () => {
    const rule = { hp: 10, atk: 11, def: 12, spAtk: 11, spDef: 12, spd: 10 };
    expect(validateAbilityValues(createAbilityValues(20), rule)).toBe(false);
    expect(
      validateAbilityValues({ hp: 5, atk: 8, def: 9, spAtk: 7, spDef: 8, spd: 0 }, rule),
    ).toBe(true);
    expect(
      validateAbilityValues(createAbilityValues(5, 8, 99), rule),
    ).toBe(false);
  });

  test('刻印验证测试', () => {
    const mintmark: MintmarkInfo = {
      type: MintmarkType.UNIVERSAL,
      id: 42,
      classID: 12,
      AbilityValues: EMPTY_ABILITY,
    };
    expect(
      validateMintmark(mintmark, {
        type: MintmarkType.UNIVERSAL,
        classFilter: { include: [12] },
      }),
    ).toBe(true);
    expect(
      validateMintmark(mintmark, {
        type: MintmarkType.UNIVERSAL,
        classFilter: { exclude: [12] },
      }),
    ).toBe(false);
    expect(
      validateMintmark(mintmark, {
        type: MintmarkType.UNIVERSAL,
        classFilter: { include: [34] },
      }),
    ).toBe(false);
  });
  test('刻印组合验证测试', () => {
    const mintmarks: MintmarkInfo[] = [
      {
        type: MintmarkType.UNIVERSAL,
        id: 42,
        classID: 12,
        AbilityValues: EMPTY_ABILITY
      },
      {
        type: MintmarkType.UNIVERSAL,
        id: 43,
        classID: 34,
        AbilityValues: EMPTY_ABILITY
      },
    ];
    let rule: MintmarkDetailRule = [
      { type: MintmarkType.UNIVERSAL, classFilter: { include: [12, 34], exclude: [] } },
      { type: MintmarkType.UNIVERSAL, classFilter: { include: [12], exclude: [34] } },
    ];
    expect(validateMintmarkConfiguration(mintmarks, rule)).toBe(true);

    rule = [
      { type: MintmarkType.UNIVERSAL, classFilter: { include: [12], exclude: [] } },
      { type: MintmarkType.UNIVERSAL, classFilter: { include: [12], exclude: [] } },
    ];
    expect(validateMintmarkConfiguration(mintmarks, rule)).not.toBe(true);

    rule = [
      { type: MintmarkType.ABILITY, classFilter: { include: [12], exclude: [] } },
      { type: MintmarkType.UNIVERSAL, classFilter: { include: [12], exclude: [] } },
    ];
    expect(validateMintmarkConfiguration(mintmarks, rule)).not.toBe(true);

    rule = [
      {
        type: MintmarkType.UNIVERSAL,
        classFilter: { include: [12], exclude: [] }
      },
      {
        type: MintmarkType.UNIVERSAL,
        idFilter: { include: [888] },
        classFilter: { include: [12, 999], exclude: [] },
      },
    ];
    mintmarks[1] = {
      type: MintmarkType.UNIVERSAL,
      id: 888,
      classID: 999,
      AbilityValues: EMPTY_ABILITY,
    };
    expect(validateMintmarkConfiguration(mintmarks, rule)).toBe(true);

    mintmarks[1] = {
      type: MintmarkType.UNIVERSAL,
      id: 889,
      classID: 999,
      AbilityValues: EMPTY_ABILITY,
    };
    expect(validateMintmarkConfiguration(mintmarks, rule)).not.toBe(true);

    mintmarks[1] = { type: MintmarkType.SKILL, id: 889, skillID: 777 };
    expect(validateMintmarkConfiguration(mintmarks, rule)).not.toBe(true);

    rule[1] = { type: MintmarkType.SKILL, idFilter: { include: ['666~999'] } };
    expect(validateMintmarkConfiguration(mintmarks, rule)).toBe(true);

    mintmarks[2] = { type: MintmarkType.SKILL, id: 889, skillID: 777 };
    expect(validateMintmarkConfiguration(mintmarks, rule)).not.toBe(true);
  });

  test('精灵特性测试', () => {
    expect(
      validatePetEffect(666, { id: 6, level: 5 }, { maxLevel: 4 }),
    ).not.toBe(true);
    expect(
      validatePetEffect(666, { id: 6, level: 5 }, { maxLevel: 5 }),
    ).toBe(true);
  });
});
