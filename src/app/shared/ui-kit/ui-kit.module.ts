import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxjsPaginatorComponent } from './paginator/rxjs-paginator.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    RxjsPaginatorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    RxjsPaginatorComponent
  ],
})
export class UiKitModule { }
