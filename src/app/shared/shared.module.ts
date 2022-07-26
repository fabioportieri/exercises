import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiKitModule } from './ui-kit/ui-kit.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UiKitModule
  ],
  exports: [
    UiKitModule
  ],
})
export class SharedModule { }
