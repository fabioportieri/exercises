import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SplitterDemoComponent } from './splitter-demo.component';

const routes: Routes = [{ path: '', component: SplitterDemoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SplitterDemoRoutingModule { }
