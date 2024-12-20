import { Metadata } from '../general-schema/metadata.js';
import { PetPool } from '../pet-pool/pet-pool-schema.js';
import {
  RoundBanPickPhase,
  ClassicBanPickPhase,
} from '../ban-pick-phase/phase-schema.js';
import { PetSetRule } from './pet-set-rule.js';

export interface TournamentRule extends Metadata {
  petPool: PetPool;
  phase: RoundBanPickPhase | ClassicBanPickPhase;
  petSetRule: PetSetRule;
}
