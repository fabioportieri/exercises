import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  NgModule,
} from '@angular/core';
import { TreeItemComponent } from './tree-item.component';

// https://repo.spring.io/ui/repos/tree/General/ext-release-local/.index
@Component({
  selector: 'app-tree-widget',
  template: `
   <app-tree-item></app-tree-item>
  `,
  styles: [`

  `],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeWidgetComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

@NgModule({
  declarations: [TreeWidgetComponent, TreeItemComponent],
  imports: [CommonModule],
  exports: [TreeWidgetComponent, TreeItemComponent],
})
export class TreeWidgetModule {}
