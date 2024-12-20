import {
  MintmarkInfo,
  PetEffectInfo,
  PetInfo,
  PetExtraAbilityValue,
  PetAbilityValue,
} from 'seer-interfaces/pet/pet-info-schema.js';
import {
  EffectFilterRule,
  EffectRule,
  MintmarkDetailRule,
  MintmarkRule,
  MintmarkSimpleRule,
  MintmarkSlot,
  PetSetRule,
  SemanticOption,
} from 'seer-interfaces/rule-set/pet-set-rule.js';
import { Item, ItemFilter } from 'seer-interfaces/general-schema/filter.js';
import {
  AbilityError,
  AllErrors,
  ExtractError,
  MintmarkError,
  PetSetErrors,
  PetSetValidationResult,
} from 'seer-interfaces/rule-set/validate-result-schema.js';
import {
  generatePermutations,
  hasIntersection,
  newError,
} from './utils/index.js';
import { getPetByID, getSkillByID } from './utils/get-game-data.js';

function isSkillStone(skillID: number): boolean {
  return skillID > 100000;
}

function isFusionPet(petID: number): boolean {
  return Boolean(getPetByID(petID)['IsFuseMon']);
}

export function validateMintmark(
  mintmark: MintmarkInfo,
  slotRule: MintmarkSlot,
): boolean {
  const typeIsSame =
    slotRule.type === 'no-limit' || mintmark.type === slotRule.type;

  return (
    typeIsSame &&
    itemFilterValidator(mintmark.id, slotRule.idFilter) &&
    (mintmark.type === 'ability'
      ? itemFilterValidator(mintmark.classID, slotRule.classFilter)
      : true)
  );
}

export function mintmarkSimpleRuleConvert(
  rule: MintmarkSimpleRule,
): MintmarkDetailRule {
  const result: MintmarkDetailRule = [];
  for (let index = 0; index < rule.singlePetLimit; index++) {
    result[index] = {
      type: 'no-limit',
      idFilter: rule.idFilter,
      classFilter: rule.classFilter,
    };
  }
  return result;
}

export function validateMintmarkConfiguration(
  mintmarks: MintmarkInfo[], // 每个刻印槽的实际刻印内容
  restrictions: MintmarkRule,
): true | MintmarkError {
  if (restrictions === 'no-limit') {
    return true;
  }
  if (restrictions === 'banned') {
    return newError('mintmark', '禁止携带刻印');
  }

  if (!(restrictions instanceof Array)) {
    restrictions = mintmarkSimpleRuleConvert(restrictions);
  }

  if (mintmarks.length > restrictions.length) {
    return newError(
      'mintmark',
      `规则限定携带${restrictions.length}个刻印，精灵携带了${mintmarks.length}个`,
    );
  }

  // 尝试所有排列组合
  for (const perm of generatePermutations(mintmarks)) {
    if (
      perm.every((mintmark, index) => {
        const slotRule = restrictions[index];
        // 验证规则
        return validateMintmark(mintmark, slotRule);
      })
    ) {
      return true; // 找到合法组合
    }
  }
  return newError('mintmark', '该精灵携带刻印不符合规则要求');
}

export function validatePetEffect(
  petID: number,
  petEffect: PetEffectInfo,
  rule: EffectRule,
): AbilityError | true {
  const validate = (rule: EffectFilterRule) => {
    if (petEffect.level > rule.maxLevel) {
      return newError(
        'ability',
        `精灵特性等级超过规则限制，精灵特性${petEffect.level}级，规则限制${rule.maxLevel}级`,
      );
    }
    if (!itemFilterValidator(petEffect.id, rule.idFilter)) {
      return newError('ability', `精灵特性不在规则允许范围内，详见规则书`);
    }
    return true;
  };

  if (rule === 'no-limit') return true;
  if (rule === 'banned') {
    return isFusionPet(petID)
      ? validate({ maxLevel: 0 })
      : newError('ability', '非融合精灵禁止开启特性');
  }
  return validate(rule);
}

function mergeAbilityValues<
  T extends {
    [k in keyof T]: k extends keyof PetAbilityValue
      ? T[k] extends number
        ? T[k]
        : never
      : never;
  },
>(params: T[]): Record<keyof T, number> {
  const result = {} as Record<keyof T, number>;
  for (const values of params) {
    for (const key in values) {
      result[key] = ((result[key] || 0) as number) + values[key];
    }
  }
  return result;
}

export function validateAbilityValues(
  pet: PetExtraAbilityValue,
  rule: PetExtraAbilityValue,
): boolean {
  for (const key in pet) {
    if (!(pet[key] <= (rule[key] || Infinity))) {
      return false;
    }
  }
  return true;
}

function semanticOptionHandler<T, U extends AllErrors['errorType']>(
  errorType: U,
  option: SemanticOption | T,
  func: (arg: T) => ExtractError<U> | true,
  bannedMessage: string,
): ExtractError<U> | true {
  switch (option) {
    case 'banned':
      return newError(errorType, bannedMessage);
    case 'no-limit':
      return true;
    default:
      return func(option);
  }
}

function validateFilt(id: number, item: Item): boolean {
  if (typeof item === 'number') {
    return id === item;
  }
  if (typeof item === 'string') {
    const range = item.split('~').map((value) => parseInt(value));
    return id >= range[0] && id <= range[1];
  }
  return false;
}

export function itemFilterValidator(
  id: number,
  filter?: ItemFilter | null,
): boolean {
  const includes = filter?.include ?? [];
  const excludes = filter?.exclude ?? [];
  return (
    (includes.length === 0 ||
      includes.some((filt) => validateFilt(id, filt))) &&
    !excludes.some((filt) => validateFilt(id, filt))
  );
}

// 检查单只精灵配置
export function petSetValidator(
  petInfo: PetInfo,
  petSetRule: PetSetRule,
): PetSetValidationResult {
  const result: (PetSetErrors | boolean)[] = [];

  // 技能检查
  for (const skillID of petInfo.skills) {
    // 技能石检查
    const skill = getSkillByID(skillID);
    if (isSkillStone(skillID)) {
      const res = semanticOptionHandler(
        'skill',
        petSetRule.skillstone,
        (filter) =>
          itemFilterValidator(skillID, filter) ||
          newError(
            'skill',
            `该精灵携带的技能石【${skill.name}】不符合规则要求。`,
          ),
        `规则禁止携带技能石，该精灵携带了【${skill.name}】。`,
      );
      result.push(res);
    }
    //  技能效果检查
    if (petSetRule.excludeSkills.includes(skillID)) {
      result.push(newError('skill', `技能【${skill.name}】是被规则禁用的`));
    }
    if (hasIntersection(skill.sideEffect, petSetRule.excludeSkillEffects)) {
      result.push(newError('skill', `技能【${skill.name}】中存在被禁用的效果`));
    }
  }

  // 刻印检查
  result.push(
    validateMintmarkConfiguration(petInfo.mintmarks, petSetRule.mintmarks),
  );

  // 特性检查
  result.push(
    validatePetEffect(petInfo.petID, petInfo.effect, petSetRule.effect),
  );

  // 额外属性检查
  const mergedExtraAbility = mergeAbilityValues(
    Object.values(petInfo.extraAbility),
  );
  result.push(
    semanticOptionHandler(
      'ability',
      petSetRule.extraAbility,
      (limit) =>
        validateAbilityValues(mergedExtraAbility, limit) ||
        newError(
          'ability',
          `该精灵部分加成超出了规则限制，${mergedExtraAbility}，规则限制${petSetRule.extraAbility}。`,
        ),
      `该规则禁止具有额外加成的精灵参战。`,
    ),
  );

  return {
    petID: petInfo.petID,
    errors: {},
  };
}
