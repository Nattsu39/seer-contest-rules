import { SemanticOption } from './pet-set-rule.js';
import { ItemFilter } from "~seer-interfaces/general-schema/index.js";
import { UserSet } from '../user/index.js';
import { UserSetValidationResult } from './validate-result-schema.js';

// 赛尔配置规则接口（目前只有套装&称号）
export interface UserSetRule {
  equip: ItemFilter | SemanticOption; // 能力套装与部件
  achievement: ItemFilter | SemanticOption; // 能力称号
  postExtraValidator?(
    this: UserSetRule,
    userSetInfo: UserSet,
  ): UserSetValidationResult; // 额外检查
}
