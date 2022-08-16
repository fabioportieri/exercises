import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxjsPaginatorComponent } from './paginator/rxjs-paginator.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    RxjsPaginatorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  exports: [
    RxjsPaginatorComponent,

  ],
})
export class UiKitModule { }
