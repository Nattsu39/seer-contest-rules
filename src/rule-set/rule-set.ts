import { Metadata } from "~seer-interfaces/general-schema/index.js";
import { PetPool } from '../pet-pool/index.js';
import {
  RoundBanPickPhase,
  ClassicBanPickPhase,
} from '../ban-pick-phase/index.js';
import { PetSetRule } from './pet-set-rule.js';

export interface TournamentRule extends Metadata {
  petPool: PetPool;
  phase: RoundBanPickPhase | ClassicBanPickPhase;
  petSetRule: PetSetRule;
}
