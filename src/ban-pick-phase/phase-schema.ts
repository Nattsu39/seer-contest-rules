import { RequiredMetadata } from '~seer-interfaces/general-schema/metadata.js';

// 定义 ban/pick 的操作
export interface BanPickAction {
  type?: 'pet' | 'equip'; //
  actionType: 'ban' | 'pick' | 'hide' | 'flop'; // 操作类型，可以是 ban（禁用）、pick（选择）、hide（暗雷 pick）或 flop（翻牌 pick）
  round: number; // 轮次，例如 1 表示第一轮，2 表示第二轮
  playerSide: 'blue' | 'red'; // 操作的玩家方，蓝方或红方
}

// 传统 bp 流程，例如 12ban3
export interface ClassicBanPickPhase extends RequiredMetadata {
  type: 'classic';
  maxPick: number; // 背包可携带精灵数量
  maxBan: number; // 可禁用精灵数量
}

// 定义游戏的 ban/pick 流程
export interface RoundBanPickPhase extends RequiredMetadata {
  type: 'round';
  actions: BanPickAction[]; // 所有玩家的 ban/pick 操作，按顺序排列
}

/* 示例：创建一个 ban/pick 流程对象
const gamePhase: RoundBanPickPhase = {
  type: 'round',
  actions: [
    { actionType: 'ban', round: 1, playerSide: 'blue' },
    { actionType: 'ban', round: 1, playerSide: 'red' },

    { actionType: 'ban', round: 2, playerSide: 'blue' },
    { actionType: 'ban', round: 2, playerSide: 'red' },

    { actionType: 'ban', round: 3, playerSide: 'blue' },
    { actionType: 'ban', round: 3, playerSide: 'red' },

    { actionType: 'pick', round: 4, playerSide: 'blue' },
    { actionType: 'pick', round: 4, playerSide: 'red' },

    { actionType: 'pick', round: 5, playerSide: 'red' },
    { actionType: 'pick', round: 5, playerSide: 'blue' },

    { actionType: 'pick', round: 6, playerSide: 'blue' },
    { actionType: 'pick', round: 6, playerSide: 'red' },

    { actionType: 'ban', round: 7, playerSide: 'red' },
    { actionType: 'ban', round: 7, playerSide: 'blue' },

    { actionType: 'ban', round: 8, playerSide: 'red' },
    { actionType: 'ban', round: 8, playerSide: 'blue' },

    { actionType: 'pick', round: 9, playerSide: 'red' },
    { actionType: 'pick', round: 9, playerSide: 'blue' },

    { actionType: 'pick', round: 10, playerSide: 'blue' },
    { actionType: 'pick', round: 10, playerSide: 'red' },
  ],
  name: "",
  description: "",
  author: ""
};
*/
