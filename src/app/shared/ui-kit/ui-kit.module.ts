import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxjsPaginatorComponent } from './paginator/rxjs-paginator.component';



@NgModule({
  declarations: [
    RxjsPaginatorComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RxjsPaginatorComponent
  ],
})
export class UiKitModule { }
