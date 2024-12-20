export interface Filter<T> {
  include?: T[];
  exclude?: T[];
}

export type IDRange = `${number}~${number}`;
export type Item = IDRange | number;
export type ItemFilter = Filter<Item>;
