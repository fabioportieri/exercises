import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { combineLatest, forkJoin, from, merge, Observable, of } from 'rxjs';
import { map, mergeMap, concatMap, tap, withLatestFrom, toArray } from 'rxjs/operators';
import { RxjsPaginatorComponent } from '../shared/ui-kit/paginator/rxjs-paginator.component';
import { TableDataSource } from '../shared/ui-kit/paginator/table-datasource';
import { Author, Books, BooksWithAuthor } from './books.model';
import { BooksService } from './books.service';

@Component({
  selector: 'app-books',
  template: `
      <div class="container">



    <ul>
      <li *ngFor="let el of (dataToShow$ | async)">
        <div> book: {{ el.titleBook }} </div>
        <div> title: {{ el.authorName }} </div>
      </li>
    </ul>


    <app-rxjs-paginator #paginator [data]="(res$ | async) ?? []"></app-rxjs-paginator>
    </div>

  `,
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit, AfterViewInit, OnDestroy {

  res$: Observable<BooksWithAuthor[]> = of([]);
  books$!: Observable<Books[]>;
  book$!: Observable<Books>;
  author$!: Observable<Author>;

  dataToShow$: Observable<BooksWithAuthor[]> = of([]);
  datasource?: TableDataSource<BooksWithAuthor>;

  @ViewChild('paginator') paginator!: RxjsPaginatorComponent<BooksWithAuthor>;

  constructor(
    private booksService: BooksService,
    private cd: ChangeDetectorRef
  ) {

  }


  ngOnInit(): void {

    this._loadDataFromBackend();

  }


  ngAfterViewInit(): void {
    // in this hook we know that paginator is loaded, otherwise it is undefined

    this.datasource = new TableDataSource<BooksWithAuthor>(this.paginator);
    this.datasource.connect();
    this.dataToShow$ = this.datasource.getData();
  }


  private _loadDataFromBackend(): void {

    this.books$ = this.booksService.fetchBooks();

    this.book$ = this.books$.pipe(
      concatMap((books) => {
        return from(books);
      })
    );

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
    this.dataToShow$ = this.book$.pipe(
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
      // this.dataToShow = res;
    })
  }

  ngOnDestroy(): void {
    this.datasource?.disconnect();
  }
}
