import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  NgModule,
  Input,
  ChangeDetectorRef,
  EventEmitter,
  Output,
} from '@angular/core';
import { TreeDataService } from './tree-data-source';
import { TreeItemComponent } from './tree-item.component';
import { FlatNodeView, RecursiveItemNode } from './tree-widget-model';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop'



// inspired by: https://repo.spring.io/ui/repos/tree/General/ext-release-local/.index
@Component({
  selector: 'app-tree-widget',
  template: `

    <div class="tree-widget-container" cdkDropList (cdkDropListDropped)="drop($event)">
      <app-tree-item cdkDrag
        *ngFor="let node of treeDataService.datasource; let i = index"
        (toggle)="toggleNodeHandler($event)"
        (click)="selected.emit(node)"
        [node]="node"
      >
      </app-tree-item>
    </div>
  `,
  styles: [`
  app-tree-widget {
    width: 100%;
  }
  `],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    TreeDataService
  ]
})
export class TreeWidgetComponent implements OnInit {


  private _datasource: RecursiveItemNode[] = [];
  public get datasource(): RecursiveItemNode[] {
    return this._datasource;
  }
  @Input()
  public set datasource(value: RecursiveItemNode[]) {
    this._datasource = value;
    // TODO convert recursive data structure to flattened one so that it can be consumed, anf pass the datasource to treeDataService
  }

  constructor(public treeDataService: TreeDataService, private cd: ChangeDetectorRef) {

  }

  @Output() selected: EventEmitter<FlatNodeView> = new EventEmitter<FlatNodeView>();

  ngOnInit(): void {}

  toggleNodeHandler(node: FlatNodeView): void {

    const hideNode = (node.compressed) ? false : true;
    this.treeDataService.toggleNodes(node.id, hideNode);

  }

  drop(event: CdkDragDrop<string[]>): void {
    console.log('drop ', event);
    moveItemInArray(this.treeDataService.datasource, event.previousIndex, event.currentIndex);
    // todo recalculate node metadata: level, expandable, etc
    /*
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
    */
    // this.cd.detectChanges();
    // this.cd.markForCheck();
  }
}


@NgModule({
  declarations: [TreeWidgetComponent, TreeItemComponent],
  imports: [CommonModule, DragDropModule],
  exports: [TreeWidgetComponent, TreeItemComponent, DragDropModule],
})
export class TreeWidgetModule {}
