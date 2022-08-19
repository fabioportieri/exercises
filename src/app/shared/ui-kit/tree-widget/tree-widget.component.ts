import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  NgModule,
  Input,
} from '@angular/core';
import { TreeDataService } from './tree-data-source';
import { TreeItemComponent } from './tree-item.component';
import { FlatNodeView, RecursiveItemNode } from './tree-widget-model';




// inspired by: https://repo.spring.io/ui/repos/tree/General/ext-release-local/.index
@Component({
  selector: 'app-tree-widget',
  template: `

    <div class="tree-widget-container">
      <app-tree-item
        *ngFor="let node of treeDataService.datasource; let i = index"

        [node]="node"
      >
      </app-tree-item>
    </div>
  `,
  styles: [``],
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

  constructor(public treeDataService: TreeDataService) {}

  ngOnInit(): void {}
}

@NgModule({
  declarations: [TreeWidgetComponent, TreeItemComponent],
  imports: [CommonModule],
  exports: [TreeWidgetComponent, TreeItemComponent],
})
export class TreeWidgetModule {}
