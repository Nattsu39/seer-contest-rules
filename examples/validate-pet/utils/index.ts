import {
  AllErrors,
  BaseValidationError,
  ExtractError,
} from 'seer-interfaces/rule-set/validate-result-schema.js';

export function generatePermutations<T>(arr: T[]): T[][] {
  if (arr.length === 0) return [[]];
  return arr.flatMap((val, idx) =>
    generatePermutations([...arr.slice(0, idx), ...arr.slice(idx + 1)]).map(
      (perm) => [val, ...perm],
    ),
  );
}

export function hasIntersection<T>(arr1: T[], arr2: T[]): boolean {
  return arr1.some((item) => arr2.includes(item));
}

export function newError<T extends AllErrors['errorType']>(
  errorType: T,
  message: string,
  details?: Omit<ExtractError<T>, 'errorType' | 'message'>,
): ExtractError<T> {
  return { errorType, message, ...details } as ExtractError<T>;
}

export function isValidationError(obj: any): obj is BaseValidationError {
  return typeof obj.errorType === 'string' && typeof obj.message === 'string';
}
