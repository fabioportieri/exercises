import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SplitterDemoRoutingModule } from './splitter-demo-routing.module';
import { SplitterDemoComponent } from './splitter-demo.component';
import { UiKitModule } from '../shared/ui-kit/ui-kit.module';


@NgModule({
  declarations: [
    SplitterDemoComponent
  ],
  imports: [
    CommonModule,
    SplitterDemoRoutingModule,
    UiKitModule
  ]
})
export class SplitterDemoModule { }
