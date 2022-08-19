import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  NgModule,
  Input,
} from '@angular/core';
import { TreeItemComponent } from './tree-item.component';
import { FlatNode, GenericItemNode } from './tree-widget-model';




// https://repo.spring.io/ui/repos/tree/General/ext-release-local/.index
@Component({
  selector: 'app-tree-widget',
  template: `
   <!-- <app-tree-item [node]="flattenedNodes[0]"></app-tree-item>
   <app-tree-item [node]="flattenedNodes[1]"></app-tree-item> -->
   <div class="tree-widget-container">
      <app-tree-item *ngFor="let node of flattenedNodes; let i = index;"
        [node]="node">
      </app-tree-item>
   </div>
  `,
  styles: [`

  `],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeWidgetComponent implements OnInit {


  flattenedNodes: FlatNode[] = [
  {
    expandable: true,
    name: 'ext-release-local',
    level: 1
  },
  {
    expandable: false,
    name: 'nexus-maven-repository-index.xml',
    level: 2
  },
  {
    expandable: false,
    name: 'nexus-maven-repository-index.tar.gz',
    level: 2
  },
  {
    expandable: false,
    name: 'nexus-maven-repository-index.properties',
    level: 2
  },
  {
    expandable: true,
    name: 'snapshot',
    level: 1
  },
  {
    expandable: true,
    name: '1.0.0.RC1',
    level: 2
  },
  {
    expandable: false,
    name: 'maven-metadata.xml',
    level: 3
  },
  {
    expandable: false,
    name: 'maven-metadata.xml.asc',
    level: 3
  },
  {
    expandable: true,
    name: '1.0.0.RC2',
    level: 2
  },
  {
    expandable: false,
    name: 'dependency-management-plugin-1.0.0.RC2-javadoc.jar.asc',
    level: 3
  },
  {
    expandable: false,
    name: 'dependency-management-plugin-1.0.0.RC2.jar',
    level: 3
  },
  ];


  private _datasource: GenericItemNode[] = [];
  public get datasource(): GenericItemNode[] {
    return this._datasource;
  }
  @Input()
  public set datasource(value: GenericItemNode[]) {
    this._datasource = value;
    // TODO convert recursive data structure to flattened one so that it can be consumed here


  }

  constructor() {}


  ngOnInit(): void {}
}

@NgModule({
  declarations: [TreeWidgetComponent, TreeItemComponent],
  imports: [CommonModule],
  exports: [TreeWidgetComponent, TreeItemComponent],
})
export class TreeWidgetModule {}
