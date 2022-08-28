import { Component, OnInit } from '@angular/core';
import { combineLatest, forkJoin, from, merge, Observable, of } from 'rxjs';
import { map, mergeMap, mergeAll, concatAll, concatMap, tap, withLatestFrom, toArray } from 'rxjs/operators';
import { Author, Books, BooksWithAuthor } from './books.model';
import { BooksService } from './books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  res$: Observable<BooksWithAuthor[]> = of([]);
  books$!: Observable<Books[]>;
  book$!: Observable<Books>;
  author$!: Observable<Author>;
  constructor(private booksService: BooksService) { }

  ngOnInit(): void {


    // fetch books
    this.books$ = this.booksService.fetchBooks();

    //convert the observable emitting only one value (array of books) to
    // an observable emitting several values where each value is a book in the former array
    this.book$ = this.books$.pipe(
      concatMap((books) => {
        return from(books);
      })
    );

    // this.book$ = this.books$.pipe(concatAll()); // alernative version, when we need only flattening and no mapping

    // solution 1:
    this.res$ = this.book$.pipe(
      mergeMap(book => {
        return this.booksService.getAuthorById(book.authorId).pipe(
          map(author => ({ authorName: author.name, titleBook: book.title} as BooksWithAuthor))
        )
      }),
      toArray()
    );


    // solution 2:
    this.res$ = this.book$.pipe(
      mergeMap(book => {
        return combineLatest([
          this.booksService.getAuthorById(book.authorId),
          of(book)
        ])
      }),
      map(([author, book]: [Author, Books]) => {
        return { authorName: author.name, titleBook: book.title} as BooksWithAuthor;
      }),
      toArray()
    );


    // in both solutions we had to pass the parameter book further in the chain:
    // https://medium.com/@snorredanielsen/rxjs-accessing-a-previous-value-further-down-the-pipe-chain-b881026701c1



    this.res$.subscribe(res => {
      // console.log('res', res);
    })

  }

}
