type ErrorTypeMark = string;

export interface BaseValidationError {
  errorType: ErrorTypeMark;
  message: string;
}

export interface EffectError extends BaseValidationError {
  errorType: 'effect';
}

export interface SkillError extends BaseValidationError {
  errorType: 'skill';
}

export interface MintmarkError extends BaseValidationError {
  errorType: 'mintmark';
}

export interface AbilityError extends BaseValidationError {
  errorType: 'ability';
}

export interface EquipError extends BaseValidationError {
  errorType: 'equip';
}

export interface AchievementError extends BaseValidationError {
  errorType: 'achievement';
}

export interface PetBagError extends BaseValidationError {
  errorType: 'petbag';
}

export interface CustomError extends BaseValidationError {
  errorType: 'custom';
  title?: string;
}

export type PetSetErrors =
  | EffectError
  | SkillError
  | MintmarkError
  | AbilityError
  | CustomError;
export type UserErrors = EquipError | AchievementError | CustomError;
export type PetBagErrors = PetBagError | CustomError;
export type AllErrors = PetSetErrors | UserErrors | PetBagErrors;

export type ExtractError<T extends ErrorTypeMark> = Extract<
  AllErrors,
  { errorType: T }
>;

type ValidationResult<T extends BaseValidationError> = {
  [K in T['errorType'][][number]]?: Extract<T, { errorType: K }>[];
};

export interface PetBagValidationResult {
  petID: number;
  petPosition: number;
  errors: ValidationResult<PetBagErrors>;
}

export interface PetSetValidationResult {
  petID: number;
  errors: ValidationResult<PetSetErrors>;
}

export interface UserSetValidationResult {
  equip: [number, number, number, number, number];
  achievement: number;
  errors: ValidationResult<UserErrors>;
}
