import { PetAbilityValue } from "./index.js";


export enum MintmarkType {
  SKILL = 'SKILL',
  ABILITY = 'ABILITY',
  UNIVERSAL = 'UNIVERSAL',
  QUANXIAO = 'QUANXIAO',
}

interface BaseMintmarkInfo {
  type: MintmarkType;
  id: number;
}

/**技能刻印信息 */
export interface SkillMintmarkInfo extends BaseMintmarkInfo {
  type: MintmarkType.SKILL;
  skillID: number;
}

export interface GemItem {
  category: number;
  level: number;
}

/**能力刻印信息 */
export interface AbilityMintmarkInfo extends BaseMintmarkInfo {
  type: MintmarkType.ABILITY;
  AbilityValues: PetAbilityValue;
}

/**全能刻印信息 */
export interface UniversalMintmarkInfo extends BaseMintmarkInfo {
  type: MintmarkType.UNIVERSAL;
  AbilityValues: PetAbilityValue;
  classID: number;
  gem?: GemItem;
}

/**全效刻印信息 */
export interface QuanxiaoMintmarkInfo extends BaseMintmarkInfo {
  type: MintmarkType.QUANXIAO;
  AbilityValues: PetAbilityValue;
  skillID: number;
}

export type MintmarkInfo = SkillMintmarkInfo | AbilityMintmarkInfo | UniversalMintmarkInfo | QuanxiaoMintmarkInfo;
