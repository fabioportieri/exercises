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


    this.books$ = this.booksService.fetchBooks();

    this.book$ = this.books$.pipe(
      concatMap((books) => {
        return from(books);
      })
    );

    this.author$ = this.book$.pipe(
      mergeMap(book => this.booksService.getAuthorById(book.authorId))
    )

    this.res$ = this.author$.pipe(
      withLatestFrom(this.books$),
      map(([author, books]: [Author, Books[]]) => {
          const book = books.find(b => b.authorId === author.id)
          return { authorName: author.name, titleBook: book?.title };
      }),
      toArray()
    )



    this.res$.subscribe(res => {
      console.log('res', res);
    })

  }

}
