import { Injectable } from "@angular/core";
import { FlatNodeView, GenericItemNode } from "./tree-widget-model";


@Injectable()
export class TreeDataService {

  // todo get from service backend
  datasource: FlatNodeView[] = [
    {
      id: 1,
      parentId: null,
      expandable: true,
      name: 'main',
      level: 1,
      isLastChild: true,
      ancestorsIds: [],
      childrenIds: [2, 10],

    },
    {
      id: 2,
      parentId: 1,
      expandable: true,
      name: 'io',
      level: 2,
      isLastChild: false,
      ancestorsIds: [1],
      childrenIds: [3]
    },
    {
      id: 3,
      parentId: 2,
      expandable: true,
      name: 'spring',
      level: 3,
      isLastChild: true,
      ancestorsIds: [1, 2],
      childrenIds: [4]
    },
    {
      id: 4,
      parentId: 3,
      expandable: true,
      name: 'gradle',
      level: 4,
      isLastChild: true,
      ancestorsIds: [1, 2, 3],
      childrenIds: [5]
    },
    {
      id: 5,
      parentId: 4,
      expandable: true,
      name: 'dependency-management-plugin',
      level: 5,
      isLastChild: true,
      ancestorsIds: [1, 2, 3, 4],
      childrenIds: [6, 9]
    },
    {
      id: 6,
      parentId: 5,
      expandable: true,
      name: '1.0.0.RC2',
      level: 6,
      isLastChild: false,
      ancestorsIds: [1, 2, 3, 4, 5],
      childrenIds: [7, 8]
    },
    {
      id: 7,
      parentId: 6,
      expandable: false,
      name: 'dependency-management.pom.xml',
      level: 7,
      isLastChild: false,
      ancestorsIds: [1, 2, 3, 4, 5, 6],
      childrenIds: []
    },
    {
      id: 8,
      parentId: 6,
      expandable: false,
      name: 'dependency-management.pom.tmp',
      level: 7,
      isLastChild: true,
      ancestorsIds: [1, 2, 3, 4, 5, 6],
      childrenIds: []
    },
    {
      id: 9,
      parentId: 5,
      expandable: false,
      name: '2.0.0.RC1',
      level: 6,
      isLastChild: true,
      ancestorsIds: [1, 2, 3, 4, 5],
      childrenIds: []
    },
    {
      id: 10,
      parentId: 1,
      expandable: false,
      name: 'com',
      level: 2,
      isLastChild: true,
      ancestorsIds: [1],
      childrenIds: []
    },
  ];

  constructor() {}

  showNodes(nodeId: number): void {
    const nodeFound = this.datasource.find(el => el.id === nodeId);
    if (nodeFound) {
      nodeFound.compressed = false;
      // TreeUtils.findAllChildren(nodeId, this.datasource)
      // .forEach(el => console.log('shw children: ', el))
      TreeUtils.findAllChildren(nodeId, this.datasource).map(el => el.hidden = false);
    }
  }

  hideNodes(nodeId: number): void {
    const nodeFound = this.datasource.find(el => el.id === nodeId);
    if (nodeFound) {
      nodeFound.compressed = true;
      // TreeUtils.findAllChildren(nodeId, this.datasource)
      // .forEach(el => console.log('hide children: ', el))
      TreeUtils.findAllChildren(nodeId, this.datasource)
      .map(el => el.hidden = true);
    }
  }
}





export class TreeUtils {
  constructor() {}


  public static findAllChildren(
    idNode: number, datasource: FlatNodeView[], res: FlatNodeView[] = []): FlatNodeView[] {
      // debugger;
    let children = [];
    for (let node of datasource) {
      if (node.parentId === idNode) {
        children.push(node);
      }
    }
    for (let node of children) {
      res.push(node);
      res.push(...TreeUtils.findAllChildren(node.id, datasource, res));
    }
    // todo miglioralo
    return res.filter((v,i,a)=>a.findIndex(v2=>(v2.id===v.id))===i);

  }

  public static calculateAncestorIds<T extends GenericItemNode>(idNode: number, listDocuments: T[]): number[] {
    const res = [];
    // 1. trova il parentId di idNode
    // 2. per quel parentId, trova il suo parentId, a ritroso
    let parentId: number | null = idNode;
    do {
      parentId = TreeUtils.findParentId(idNode, listDocuments);
      parentId && res.unshift(parentId);
    } while (parentId)
    return res;
  }

  public static calculateChildrenIds<T extends GenericItemNode>(idNode: number, listDocuments: T[]): number[] {
    //  trova nodi con idParentId = idNode
    return 	listDocuments.filter(el => el.parentId === idNode).map(el => el.id);
  }


  public static findParentId<T extends GenericItemNode>(idNode: number, listDocuments: T[]): number | null {
    return listDocuments.find(el => el.id === idNode)?.parentId ?? null;
  }
}
