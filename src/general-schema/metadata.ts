export interface Metadata {
  name: string;
  version: string;
  description: string;
  author: string;
}

export interface RequiredMetadata {
  metadata: Metadata;
}
