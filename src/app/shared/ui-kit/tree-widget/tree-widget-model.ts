export interface RecursiveItemNode {
  label: string;
  children?: RecursiveItemNode[];
}

export type GenericItemNode = {
  id: number;
  parentId: number;
  data: any; // not important for now
}

export interface FlatNodeView {
  id: number;
	parentId: number | null;
  expandable: boolean;
  name: string;
  level: number;
	isLastChild: boolean;
  ancestorsIds: number[]; // ordered, the last element is the direct parent
  childrenIds: number[]; // ordered, the last element is the last child
}
