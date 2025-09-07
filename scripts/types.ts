export interface Collection {
  id: string;
  name: string;
  description: string;
  relays: string[];
}

export interface CollectionData {
  collections: Collection[];
}
