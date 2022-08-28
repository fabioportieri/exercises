import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxjsPaginatorComponent } from './paginator/rxjs-paginator.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SplitterComponent } from './splitter/splitter.component';
import { TreeWidgetComponent, TreeWidgetModule } from './tree-widget/tree-widget.component';
import { TreeItemComponent } from './tree-widget/tree-item.component';

@NgModule({
  declarations: [
    RxjsPaginatorComponent,
    SplitterComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  exports: [
    RxjsPaginatorComponent,
    SplitterComponent,
    TreeWidgetModule,
  ],
})
export class UiKitModule { }
