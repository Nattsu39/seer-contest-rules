import { MintmarkInfo } from "./mintmark.js";

export * from './mintmark.js';

export interface PetAbilityValue {
  hp: number;
  atk: number;
  def: number;
  spAtk: number;
  spDef: number;
  spd: number;
}

export type PetAbilityValueTotal = {
  base: PetAbilityValue;
  pvp: PetAbilityValue;
  pve: PetAbilityValue;
};

/**精灵特性信息 */
export interface PetEffectInfo {
  id: number;
  level: 0 | 1 | 2 | 3 | 4 | 5;
}

export const PetExtraAbilityType = [
  'EXTRA_HP',
  'TEAM_TECH',
  'ANNUAL_VIP',
  'SUPER_NONO',
  'UNSPECIFIED',
] as const;

export type PetExtraAbilityType = typeof PetExtraAbilityType[number];

export interface PetExtraAbilityItem {
  type: PetExtraAbilityType;
  values: PetAbilityValue;
}

/**精灵额外数值 */
export type PetExtraAbility = PetExtraAbilityItem[];

/**伤害抗性信息，其中的数值为实际数值，不需要换算 */
export interface HurtResist {
  crit: number;
  regular: number;
  precent: number;
}

/**单项异常抗性，其中的{@link percent}数值为实际数值，不需要换算 */
export interface StateResistItem {
  stateID: number;
  stateName?: string;
  percent: number;
}

export type StateResist = [StateResistItem, StateResistItem, StateResistItem];

/**抗性信息，其中的抗性百分比数值为实际数值，不需要换算 */
export interface ResistanceInfo {
  hurt: HurtResist;
  ctl: StateResist;
  weak: StateResist;
}

/**精灵信息 */
export interface PetInfo {
  /**精灵 ID */
  petID: number;
  /**精灵内部唯一标识 */
  catchTime: number;
  /**精灵等级 */
  lv: number;
  /**精灵个体值 */
  dv: number;
  /**精灵学习力 */
  EVs: PetAbilityValue;
  /**精灵特性*/
  effect?: PetEffectInfo;
  /**精灵额外数值*/
  extraAbility: PetExtraAbility;
  /**精灵携带的刻印，详见{@link MintmarkInfo}*/
  mintmarks: MintmarkInfo[];
  /**精灵携带的战斗道具 ID 数组（能量珠啥的）*/
  effectItems: number[];
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

export interface PetInBagInfo extends PetInfo {
  /**精灵在背包中的位置，从 0 开始*/
  position: number;
}

/**背包中的精灵列表 */
export type PetBag = PetInBagInfo[];
