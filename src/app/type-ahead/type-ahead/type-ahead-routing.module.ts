import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TypeAheadComponent } from './type-ahead.component';

const routes: Routes = [{ path: '', component: TypeAheadComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TypeAheadRoutingModule { }
