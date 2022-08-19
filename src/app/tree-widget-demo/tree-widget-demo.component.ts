import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
} from '@angular/core';

interface GenericItemNode {
  label: string;
  children?: GenericItemNode[];
}


@Component({
  selector: 'app-tree-widget-demo',
  template: `
    <div class="container">
      <app-tree-widget [datasource]="treeData"> </app-tree-widget>
    </div>
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



treeData: GenericItemNode[] = [
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

}
