import { ItemFilter } from "~seer-interfaces/general-schema/index.js";
import { RequiredMetadata } from "~seer-interfaces/general-schema/index.js";
import { PetAbilityValue, PetInfo } from '../pet/index.js';
import { PetSetValidationResult } from './validate-result-schema.js';

export type SemanticOption = 'banned' | 'no-limit';

export interface EffectFilterRule {
  idFilter?: ItemFilter;
  maxLevel: 0 | 1 | 2 | 3 | 4 | 5;
}

export type MintmarkSimpleRule = {
  singlePetLimit: 1 | 2 | 3;
  idFilter?: ItemFilter;
  classFilter?: ItemFilter;
};

export interface MintmarkSlot {
  // 可选的刻印需要同时符合两个 Filter 的规则
  type: 'ability' | 'skill' | 'no-limit';
  idFilter?: ItemFilter;
  classFilter?: ItemFilter;
}

export type MintmarkDetailRule = MintmarkSlot[];

export type EffectRule = EffectFilterRule | SemanticOption;
export type MintmarkRule =
  | MintmarkSimpleRule
  | MintmarkDetailRule
  | SemanticOption;
export type PetAbilityLimit = PetAbilityValue | SemanticOption;
export type SkillStoneRule = ItemFilter | SemanticOption;

// 精灵配置规则接口
export interface PetSetRule extends RequiredMetadata {
  effect: EffectRule; // 精灵特性
  extraAbility: PetAbilityLimit; // 额外数值
  mintmarks: MintmarkRule; // 刻印限制
  skillstone: SkillStoneRule; // 技能石
  excludeSkills: number[]; // 禁用的技能 ID
  excludeSkillEffects: number[]; // 禁用的技能效果 ID
  preExtraValidator?(
    this: PetSetRule,
    petInfo: PetInfo,
  ): PetSetValidationResult;
  postExtraValidator?(
    this: PetSetRule,
    petInfo: PetInfo,
  ): PetSetValidationResult; // 额外检查
}
