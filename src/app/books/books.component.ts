import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { combineLatest, forkJoin, from, merge, Observable, of } from 'rxjs';
import {
  map,
  mergeMap,
  concatMap,
  tap,
  withLatestFrom,
  toArray,
} from 'rxjs/operators';
import { RxjsPaginatorComponent } from '../shared/ui-kit/paginator/rxjs-paginator.component';
import { TableDataSource } from '../shared/ui-kit/paginator/table-datasource';
import { Author, Books, BooksWithAuthor } from './books.model';
import { BooksService } from './books.service';

@Component({
  selector: 'app-books',
  template: `
    <div class="container" *ngIf="(res$ | async) as data">
      <ul>
        <li *ngFor="let el of (dataToShow$ | async) ?? []">
          <div><span class="title">book</span> {{ el.titleBook }}</div>
          <div><span class="title">author</span> {{ el.authorName }}</div>
        </li>
      </ul>

      <app-rxjs-paginator
        #paginator
        [data]="data"
      ></app-rxjs-paginator>
    </div>
  `,
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit, AfterViewInit, OnDestroy {
  res$: Observable<BooksWithAuthor[]> = of([]);
  books$!: Observable<Books[]>;
  book$!: Observable<Books>;
  author$!: Observable<Author>;

  dataToShow$?: Observable<BooksWithAuthor[]>;
  datasource?: TableDataSource<BooksWithAuthor>;

  // use viewchildren instead of viewchild because if template reference is under a *ngIf it will stay undefined even after view init
  // @ViewChild('paginator') paginator!: RxjsPaginatorComponent<BooksWithAuthor>;
  @ViewChildren('paginator') paginatorWrapper!: QueryList<
    RxjsPaginatorComponent<BooksWithAuthor>
  >;
  paginator!: RxjsPaginatorComponent<BooksWithAuthor>;

  constructor(
    private booksService: BooksService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this._loadDataFromBackend();
  }

  ngAfterViewInit(): void {
    // in this hook we know that paginator is loaded (unless behind ngIf condition), otherwise it is undefined

    this.paginatorWrapper.changes.subscribe(
      (comps: QueryList<RxjsPaginatorComponent<BooksWithAuthor>>) => {
        this.paginator = comps.first;
        console.log('PPaginator', this.paginator);
        this.datasource?.disconnect(); // clean datasource subscriptions
        this.datasource = new TableDataSource<BooksWithAuthor>(
          this.paginator
        ); // todo cleanup, avoid passing change detector
        this.datasource.connect();
        this.dataToShow$ = this.datasource.getData();
        // this programmatically force angular to check for rendering changes otherwise it will raise:
        // ERROR Error: NG0100: ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked.
        // since we are changing variables that are to be rendered asyncronously
        this.cd.detectChanges();
      }
    );
  }

  private _loadDataFromBackend(): void {
    this.books$ = this.booksService.fetchBooks();

    // books$ is an observable that emits one time and returns an array of books
    // book$ is an observable that emits each time for every element of books array
    // we use from operator to achieve this, and since 'from' returns an observable we need an high order
    // operator to flatten the observable
    this.book$ = this.books$.pipe(
      concatMap((books) => {
        return from(books);
      })
    );

    // solution 1:
    // this.res$ = this.book$.pipe(
    //   mergeMap((book) => {
    //     return this.booksService
    //       .getAuthorById(book.authorId)
    //       .pipe(
    //         map(
    //           (author) =>
    //             ({
    //               authorName: author.name,
    //               titleBook: book.title,
    //             } as BooksWithAuthor)
    //         )
    //       );
    //   }),
    //   toArray()
    // );

    // solution 2:
    this.res$ = this.book$.pipe(
      // we use concat map instead of mergemap here to preserve order of book$ emissions
      concatMap(book => {
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

    this.res$.subscribe((res) => {
      // console.log('res', res);
      // this.dataToShow = res;
    });
  }

  ngOnDestroy(): void {
    this.datasource?.disconnect();
  }
}
