import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FlatNodeView, RecursiveItemNode } from '../shared/ui-kit/tree-widget/tree-widget-model';




@Component({
  selector: 'app-tree-widget-demo',
  template: `



    <app-splitter [style]="{'height': '300px'}" styleClass="mb-5">
            <ng-template>
            <!-- <div class="container"> -->
              <app-tree-widget [datasource]="treeData" (selected)="selectedNodeHandler($event)"> </app-tree-widget>
            <!-- </div> -->
            </ng-template>
            <ng-template>
                <div class="panel col flex align-items-center justify-content-center" *ngIf="selectedNode">
                    <pre>
                      {{ selectedNode | json }}
                    </pre>
                </div>
            </ng-template>
        </app-splitter>
  `,
  styles: [
    `
      .container {
        display: block;
        width: 600px;
        margin: 30px auto;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeWidgetDemoComponent implements OnInit {

  selectedNode: FlatNodeView | null = null;

// TODO: predisporre anche formato flat direttamente
treeData: RecursiveItemNode[] = [
  {
    label: 'ext-release-local',
    children: [
      { label: 'nexus-maven-repository-index.xml' },
      { label: 'nexus-maven-repository-index.tar.gz' },
      { label: 'nexus-maven-repository-index.properties' },
    ],
  },
  {
    label: 'snapshot',
    children: [
      {
        label: '1.0.0.RC1',
        children: [
          { label: 'maven-metadata.xml' },
          { label: 'maven-metadata.xml.asc' },
        ],
      },
      {
        label: '1.0.0.RC2',
        children: [
          { label: 'dependency-management-plugin-1.0.0.RC2-javadoc.jar.asc' },
          { label: 'dependency-management-plugin-1.0.0.RC2.jar' },
        ],
      },
    ],
  },
];


  constructor() {}

  ngOnInit(): void {}

  selectedNodeHandler(selected: FlatNodeView): void {
    this.selectedNode = selected;
  }
}
