import {
  MintmarkDetailRule,
  PetSetRule,
} from 'seer-interfaces/rule-set/pet-set-rule.js';

const metadata = {
  name: '测试规则 Alpha',
  version: '0.1.0',
  description: '用于测试程序的规则',
  author: 'Nattsu39',
};

const mintmarkRule: MintmarkDetailRule = [
  { type: 'ability', classFilter: { include: [35] } },
  { type: 'ability', classFilter: { include: [35] } },
];

export const rule: PetSetRule = {
  metadata,
  mintmarks: mintmarkRule,
  skillstone: 'banned',
  excludeSkillEffects: [55],
  effect: 'banned',
  extraAbility: { hp: 10, atk: 10, def: 10, spAtk: 10, spDef: 10, spd: 10 },
  excludeSkills: [],
};
