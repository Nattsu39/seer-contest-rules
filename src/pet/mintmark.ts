import { PetAbilityValue } from "./index.js";


export const MintmarkType = [
  'SKILL',
  'ABILITY',
  'UNIVERSAL',
  'QUANXIAO',
] as const;

export type MintmarkType = typeof MintmarkType[number];

interface BaseMintmarkInfo {
  type: MintmarkType;
  id: number;
}

/**技能刻印信息 */
export interface SkillMintmarkInfo extends BaseMintmarkInfo {
  type: 'SKILL';
  skillID: number;
}

export interface GemItem {
  category: number;
  level: number;
}

/**能力刻印信息 */
export interface AbilityMintmarkInfo extends BaseMintmarkInfo {
  type: 'ABILITY';
  AbilityValues?: PetAbilityValue;
}

/**全能刻印信息 */
export interface UniversalMintmarkInfo extends BaseMintmarkInfo {
  type: 'UNIVERSAL';
  AbilityValues: PetAbilityValue;
  classID: number;
  gem?: GemItem;
}

/**全效刻印信息 */
export interface QuanxiaoMintmarkInfo extends BaseMintmarkInfo {
  type: 'QUANXIAO';
  AbilityValues?: PetAbilityValue;
  skillID: number;
}

export type MintmarkInfo = SkillMintmarkInfo | AbilityMintmarkInfo | UniversalMintmarkInfo | QuanxiaoMintmarkInfo;
