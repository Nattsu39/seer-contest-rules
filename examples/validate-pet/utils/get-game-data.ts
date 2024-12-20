import jsonP3 from 'json-p3';
import axios from 'axios';

const BASE_URI =
  'https://raw.githubusercontent.com/Nattsu39/seer_data/refs/heads/main/';

async function getData(uri: string) {
  return await axios.get(BASE_URI + uri);
}

const SKILL_DATA = (await getData('resource/config/xml/moves.json')).data;
const PET_DATA = (await getData('resource/config/xml/monsters.json')).data;

export interface SkillData {
  id: number;
  name: string;
  category: 1 | 2 | 4;
  type: number;
  maxPP: number;
  accuracy: number;
  power?: number;
  mustHit?: number;
  priority?: number;
  sideEffect?: number[];
  sideEffectArg?: number[];
}

function convertSkill(data: any): SkillData {
  const convertArgs = (value: string | number | undefined): number[] => {
    switch (typeof value) {
      case 'undefined':
        return undefined;
      case 'string':
        return value.split(' ').map(parseInt);
      case 'number':
        return [value];
    }
  };
  data.sideEffect = convertArgs(data.sideEffect);
  data.sideEffectArg = convertArgs(data.sideEffectArg);
  return data;
}

export function getSkillByID(skillID: number): SkillData | null {
  const jsonList = jsonP3.query(`$..Move[?(@.ID==${skillID})]`, SKILL_DATA);
  if (jsonList.empty()) {
    return null;
  }
  const skill = jsonList[0];
  return convertSkill(skill);
}

export function getPetByID(petID: number): any {
  return jsonP3.query(`$..Monster[?(@.ID==${petID})]`, PET_DATA)[0];
}
