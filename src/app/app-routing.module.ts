import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'books',
    loadChildren: () =>
      import('./books/books.module').then((m) => m.BooksModule),
  },
  {
    path: 'splitter',
    loadChildren: () =>
      import('./splitter-demo/splitter-demo.module').then(
        (m) => m.SplitterDemoModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./tree-widget-demo/tree-widget-demo.module').then(
        (m) => m.TreeWidgetDemoModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
