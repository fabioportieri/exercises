import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TypeAheadRoutingModule } from './type-ahead-routing.module';
import { TypeAheadComponent } from './type-ahead.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TypeAheadComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TypeAheadRoutingModule
  ],
  exports: [
    TypeAheadComponent
  ]
})
export class TypeAheadModule { }
