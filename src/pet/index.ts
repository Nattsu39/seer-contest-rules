export interface PetAbilityValue {
  hp: number;
  atk: number;
  def: number;
  spAtk: number;
  spDef: number;
  spd: number;
}

export type PetExtraAbilityValue = Partial<PetAbilityValue>;

export type PetAbilityValueTotal = {
  base: PetAbilityValue;
  pvp: PetAbilityValue;
  pve: PetAbilityValue;
};

export interface PetEffectInfo {
  id: number;
  level: 0 | 1 | 2 | 3 | 4 | 5;
}

interface BaseMintmarkInfo {
  type: string;
  id: number;
}

export interface SkillMintmarkInfo extends BaseMintmarkInfo {
  type: 'skill';
  skillID: number;
}

export interface AbilityMintmarkInfo extends BaseMintmarkInfo {
  type: 'ability';
  AbilityValues: PetExtraAbilityValue;
  classID: number;
}

export type MintmarkInfo = SkillMintmarkInfo | AbilityMintmarkInfo;

export interface PetExtraAbility {
  [key: string]: PetExtraAbilityValue | undefined;
  extraHP?: PetExtraAbilityValue;
  teamTech?: PetExtraAbilityValue;
  annualVIP?: PetExtraAbilityValue;
}

export interface HurtResist {
  crit: number;
  regular: number;
  precent: number;
}

export interface StateResistItem {
  stateID: number;
  stateName?: string;
  percent: number;
}

export type StateResist = [StateResistItem, StateResistItem, StateResistItem];

export interface ResistanceInfo {
  hurt: HurtResist;
  ctl: StateResist;
  weak: StateResist;
}

export interface PetInfo {
  /**精灵 ID */
  petID: number;
  /**精灵内部唯一标识 */
  catchTime: number;
  /**精灵名称*/
  name: string;
  /**精灵个体值 */
  dv: number;
  /**精灵学习力 */
  EVs: PetExtraAbilityValue;
  /**精灵特性*/
  effect: null | PetEffectInfo;
  /**精灵额外数值*/
  extraAbility: PetExtraAbility;
  /**精灵携带的刻印，详见{@link MintmarkInfo}*/
  mintmarks: MintmarkInfo[];
  /**精灵最终对战数值*/
  abilityValues: PetAbilityValueTotal;
  /**精灵技能 ID 数组（不包含第五技能），第五技能参见 {@link fifthSkill}*/
  skills: number[];
  /**精灵第五技能 ID，如果不存在或未获得则为`undefined`*/
  fifthSkill?: number;
  /**精灵魂印 ID，如果不存在或未获得则为`undefined`*/
  soulmarkID?: number;
  /**精灵抗性，不存在或未开启时为`undefined` */
  resistance?: ResistanceInfo;
  /**精灵是否神谕*/
  isAdvanced: boolean
}

export type BagPetInfo = (PetInfo & { position: number })[];
