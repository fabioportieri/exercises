export interface GenericItemNode {
  label: string;
  children?: GenericItemNode[];
}

export interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
}
