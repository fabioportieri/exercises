import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TreeWidgetDemoRoutingModule } from './tree-widget-demo-routing.module';
import { TreeWidgetDemoComponent } from './tree-widget-demo.component';
import { UiKitModule } from '../shared/ui-kit/ui-kit.module';


@NgModule({
  declarations: [
    TreeWidgetDemoComponent
  ],
  imports: [
    UiKitModule,
    CommonModule,
    TreeWidgetDemoRoutingModule
  ]
})
export class TreeWidgetDemoModule { }
