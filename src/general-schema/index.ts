export interface Filter<T> {
  include?: T[];
  exclude?: T[];
}

export type IDRange = `${number}~${number}`;
export type Item = IDRange | number;
export type ItemFilter = Filter<Item>;

export interface Metadata {
  name: string;
  version: string;
  description: string;
  author: string;
}

export interface RequiredMetadata {
  metadata: Metadata;
}

