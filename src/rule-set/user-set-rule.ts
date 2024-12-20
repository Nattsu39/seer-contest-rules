import { SemanticOption } from './pet-set-rule.js';
import { ItemFilter } from '../general.js';
import { UserSet } from '../user/user-set.js';
import { UserSetValidationResult } from '../interfaces/schemas/validate-result.js';

// 赛尔配置规则接口（目前只有套装&称号）
export interface UserSetRule {
  equip: ItemFilter | SemanticOption; // 能力套装与部件
  achievement: ItemFilter | SemanticOption; // 能力称号
  postExtraValidator?(
    this: UserSetRule,
    userSetInfo: UserSet,
  ): UserSetValidationResult; // 额外检查
}
