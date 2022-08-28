

# proof of concept of change detection mechanism in an angular project


this project implements a tree widget

in which the collapsing of nodes is based by modifying nodes instances properties
this will break the functionality in case we want to implement an OnPush change detection strategy
we need to refactor the code and use immutability: instead of modifying the datamodel (nodes) that are used as @Input() in the widget
component, we create new references so that it will work

(we want to use onpush to improve performance)



# Exercises

  

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.7.

  

## Development server

  

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

  

## Code scaffolding

  

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

  

## Build

  

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

  

## Running unit tests

  

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

  

## Running end-to-end tests

  

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

  

## Further help

  

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

  
  
  

# APPUNTI E ANALISI TREE WIDGET

  
  

> TODO logica per calcolare l'indentation line per ogni nodo:

ci sono 5 tipi di indentation unit

horizontal line

quando é una foglia, al posto dell icon collapsed AGGIUNGI PROP ISLEAF: BOOLEAN oppure usa expandable!

vertical line

quando su quel livello c'e' un ancestor, ma non é suo padre diretto, ed ha altri figli AGGIUNGI PROP PARENT_ID: NUMBER, oppure ultimo valore contenuto in ancestorsId

blank

quando su quel livello c'e' un ancestor, ma non é suo padre diretto, e non ha altri figli

l line

quando su quel livello c'e' un padre che non ha ulteriori figli AGGIUNGI PROP IS_LAST_CHILD: BOOLEAN

t line

quando su quel livello c'e' un padre che ha ulteriori figli (IS_LAST_CHILD = FALSE)

```typescript

hasVerticalLineIndentationClass(curr_level, node): boolean {

	// find ancestor node relative at "curr_level"

	const ancestorId = node.ancestorsId[curr_level - 1]

	if (node.ancestorsId.findIndex(el => el === ancestorId) === node.ancestorsId.length - 1) return false; // means ancestor found is direct parent, exit

	// now checks whether ancestor found has other children following the current node
	const ancestorNode = this.treeData.find(el => el.id === ancestorId);

	// i must find the direct child of ancestorNode that is the ancestor of "node" too
	// once it has been found we can check in ancestorNode.childrenIds its position in the array
	// and if its in the last position it means it has no other children
	// ex:
	// node.ancestorsIds = [2,4,5]
	// ancestorNode.childrenIds = [3,4,7]
	// trovo la posizione dell'elemento in comune in ancestorNode.childrenIds

	const ancestorNodeDirectChildId = node.ancestorsIds.find(el => ancestorNode.childrenIds.includes(el));

	const position = ancestorNode.childrenIds.findIndex(el => el === ancestorNodeDirectChildId);

	if (position === ancestorNode.childrenIds.length -1) return false;

	return true;
}
  

```

  

come  creare l array di ancestorsId, e childrenIds:

da backend arrivano dati nella forma
documento id, data.... , idDocumentoParent
1, ...., null
2, .... , 1
3, .... , 2
4, .... , 3
in versione flat, dove ogni documento ha l'id del suo parent
fai metodo 
```typescript
calculateAncestorIds(idNode: number, listDocuments: GenericItemNode[]): number[] {
	const res = [];
	// 1. trova il parentId di idNode
	// 2. per quel parentId, trova il suo parentId, a ritroso
	let parentId = idNode;
	do {
		parentId = findParentId(idNode, listDocuments);
		parentId && res.unshift(parentId);
	} while (parentId)
	return res;
}
```

```typescript
calculateChildrenIds(idNode: number, listDocuments: GenericItemNode[]): number[] {
	//  trova nodi con idParentId = idNode
	return 	listDocuments.filter(el => el.parentId === idNode).map(el => el.id);	
}
```
```typescript
findParentId(idNode: number, listDocuments: GenericItemNode[]): number {
	return 	listDocuments.find(el => el.id === idNode).parentId;
}
```
  


```html
<div class="indentation-unit" *ngFor="let curr_level of [0, ..., node.level - 1]"

[class.vertical-line]="hasVerticalLineIndentationClass(curr_level, node)"

[class.blank]="hasBlankIndentationClass(curr_level, node)"

[class.l-line]="hasLLineIndentationClass(curr_level, node)"
>

</div>
```

  

```

{

id: 1,

parentId: null,

expandable: true,

name: 'main',

level: 1,

isLeaf: false,

isLastChild: true,

ancestorsId: []

},

{

id: 2,

parentId: 1,

expandable: true,

name: 'io',

level: 2,

isLeaf: false,

isLastChild: false,

ancestorsId: [1]

},

{

id: 3,

parentId: 2,

expandable: true,

name: 'spring',

level: 3,

isLeaf: false,

isLastChild: true,

ancestorsId: [1,2]

},

{

id: 4,

parentId: 3,

expandable: true,

name: 'gradle',

level: 4,

isLeaf: false,

isLastChild: true,

ancestorsId: [1,2,3]

},

{

id: 5,

parentId: 4,

expandable: true,

name: 'dependency-management-plugin',

level: 5,

isLeaf: false,

isLastChild: true,

ancestorsId: [1,2,3,4]

},

{

id: 6,

parentId: 5,

expandable: true,

name: '1.0.0.RC2',

level: 6,

isLeaf: false,

isLastChild: false,

ancestorsId: [1,2,3,4,5]

},

{

id: 7,

parentId: 6,

expandable: false,

name: 'dependency-management.pom.xml',

level: 7,

isLeaf: true,

isLastChild: false,

ancestorsId: [1,2,3,4,5,6]

},

{

id: 8,

parentId: 6,

expandable: false,

name: 'dependency-management.pom.tmp',

level: 7,

isLeaf: true,

isLastChild: true,

ancestorsId: [1,2,3,4,5,6]

},

{

id: 9,

parentId: 5,

expandable: true,

name: '2.0.0.RC1',

level: 6,

isLeaf: true,

isLastChild: true,

ancestorsId: [1,2,3,4,5]

},

{

id: 10,

parentId: 1,

expandable: true,

name: 'com',

level: 2,

isLeaf: true,

isLastChild: true,

ancestorsId: [1]

},

```
