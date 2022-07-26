import { Component, OnInit } from '@angular/core';
import { forkJoin, from, Observable, of } from 'rxjs';
import { map, mergeMap, concatMap, tap, withLatestFrom, toArray } from 'rxjs/operators';
import { Author, Books, BooksWithAuthor } from './books.model';
import { BooksService } from './books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  res$: Observable<any> = of(null);
  books$!: Observable<Books[]>;
  book$!: Observable<Books>;
  author$!: Observable<Author>;
  constructor(private booksService: BooksService) { }

  ngOnInit(): void {


    // TODO
    // use the two apis in books.service to obtain a list of BooksWithAuthor object


    this.res$.subscribe(res => {
      console.log('res', res);
    })

  }

}
