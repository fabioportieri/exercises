import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxjsPaginatorComponent } from './paginator/rxjs-paginator.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SplitterComponent } from './splitter/splitter.component';



@NgModule({
  declarations: [
    RxjsPaginatorComponent,
    SplitterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  exports: [
    RxjsPaginatorComponent,
    SplitterComponent
  ],
})
export class UiKitModule { }
