import { describe, it, expect } from 'vitest';
import { PetInfoToProtobuf, ProtobufToPetInfo } from './index.js';
import { PetInfo } from 'seer-interfaces/pet/index.js';

const Pet: PetInfo = {
	petID: 3022,
	catchTime: 0,
	lv: 100,
	dv: 31,
	EVs: {
		atk: 252,
		hp: 252,
		spd: 4,
		def: 0,
		spAtk: 0,
		spDef: 0
	},
	effect: { id: 22, level: 3 },
	extraAbility: [
		{
			type: 'EXTRA_HP',
			values: { hp: 20, atk: 0, def: 0, spAtk: 0, spDef: 0, spd: 0 }
		}
	],
	mintmarks: [
		{ type: 'ABILITY', id: 10368 },
		{ type: 'UNIVERSAL', id: 41278, classID: 32, AbilityValues: { hp: 80, atk: 50, def: 30, spAtk: 0, spDef: 30, spd: 30 } },
		{ type: 'ABILITY', id: 10374 },
	],
	effectItems: [123, 456],
	abilityValues: {
		base: { hp: 100, atk: 100, def: 100, spAtk: 100, spDef: 100, spd: 100 },
		pvp: { hp: 100, atk: 100, def: 100, spAtk: 100, spDef: 100, spd: 100 },
		pve: { hp: 100, atk: 100, def: 100, spAtk: 100, spDef: 100, spd: 100 }
	},
	skills: [
		10001, 10002, 10003, 10004
	],
	resistance: {
		hurt: { crit: 35, regular: 35, precent: 0 },
		ctl: [{ stateID: 1, percent: 55 }, { stateID: 2, percent: 18 }, { stateID: 3, percent: 0 }],
		weak: [{ stateID: 1, percent: 55 }, { stateID: 2, percent: 18 }, { stateID: 3, percent: 0 }]
	},
	isAdvanced: true
};

describe('PetInfoToProtobuf 和 ProtobufToPetInfo', () => {
  it('测试正确地将 PetInfo 转换为 ProtoPetMessage 并再转换回 PetInfo', () => {
    const protoMessage = PetInfoToProtobuf(Pet);
    const petInfoArray = ProtobufToPetInfo(protoMessage);

    expect(petInfoArray).toHaveLength(1);
    expect(petInfoArray[0]).toEqual(Pet);
  });

  it('测试处理多个 PetInfo 对象', () => {
    const protoMessage = PetInfoToProtobuf(Pet, Pet);
    const petInfoArray = ProtobufToPetInfo(protoMessage);

    expect(petInfoArray).toHaveLength(2);
    expect(petInfoArray[0]).toEqual(Pet);
    expect(petInfoArray[1]).toEqual(Pet);
  });

  it('测试处理空的 PetInfo 数组', () => {
    const protoMessage = PetInfoToProtobuf();
    const petInfoArray = ProtobufToPetInfo(protoMessage);

    expect(petInfoArray).toHaveLength(0);
  });
});

