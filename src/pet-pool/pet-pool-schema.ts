import { Filter, IDRange } from '~seer-interfaces/general-schema/filter.js';

interface LimitRule {
  type: 'limit';
  pets: (IDRange | number)[];
  count: number;
}
interface RewardRule {
  type: 'reward';
  pets: (IDRange | number)[];
  count: number;
}

export type LimitAndRewardPool = (LimitRule | RewardRule)[];

export interface PetPool extends Filter<IDRange | number> {
  pool: LimitAndRewardPool; // 限制池和奖励池数据
}
