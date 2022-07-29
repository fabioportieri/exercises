import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./books/books.module').then(m => m.BooksModule) },
  { path: 'paolo', loadChildren: () => import('./type-ahead/type-ahead/type-ahead.module').then(m => m.TypeAheadModule) },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
