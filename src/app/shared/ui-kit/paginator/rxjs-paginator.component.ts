import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, BehaviorSubject, Observable, of } from 'rxjs';
import { distinctUntilChanged, tap } from 'rxjs/operators';
import { BooksWithAuthor } from 'src/app/books/books.model';

@Component({
  selector: 'app-rxjs-paginator',
  template: `
    <div class="paginator" *ngIf="(currentPage$ | async) as currentPage">
      <div class="first" (click)="changePage(1)"><<</div>
      <div class="back" (click)="changePage(currentPage-1)"><</div>
      <div *ngFor="let page of pages$ | async">
        <div class="pages" (click)="changePage(page)"> {{ page }} </div>
      </div>
      <div class="next" (click)="changePage(currentPage+1)"> >> </div>
      <div class="last" (click)="changePage(getLastPage())"> > </div>
    </div>

    <div class="form">
      <input type="number" class="form-control" name="elementsPerPage" [formControl]="elementsPerPageFC"  />
      <button (click)="changeElementsPerPage(elementsPerPageFC.value)">
        <span>  change to {{elementsPerPageFC.value}} elements per size </span>
      </button>
    </div>


    <pre> number of pages: {{this.pagesNumber$ | async }} </pre>
    <pre> pages: {{this.pages$ | async | json }} </pre>
    <pre> elementsPerpages: {{this.elementsPerPage$ | async }} </pre>
    <pre> totalLength: {{this.totalLength$ | async }} </pre>
    <pre> currentPage: {{ currentPage$ | async }} </pre>


  `,
  styles: [`
  .paginator {
    display: flex;
    gap: 10px;
    background: #ededed;
    padding: 5px;
    justify-content: center;
  }
  .paginator > div {
    width: 20px;
    height: 20px;
    cursor: pointer;
    line-height: 20px;
    border: 1px solid #ddd;
    background: white;
    text-align: center;
    padding: 5px;
    border-radius: 4px;
    font-weight: 600;
    color: #505050;
    font-family: monospace;
  }
  `],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RxjsPaginatorComponent implements OnInit {

  pagesNumber$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  pages$: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);
  elementsPerPage$: BehaviorSubject<number> = new BehaviorSubject<number>(2);
  currentPage$: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  totalLength$: BehaviorSubject<number> = new BehaviorSubject<number>(0); //Observable<number> = of(0);

  elementsPerPageFC: FormControl = new FormControl();

  private _pageSize = 2;
  public get pageSize() {
    return this._pageSize;
  }

  @Input()
  public set pageSize(value: number) {
    this._pageSize = value;
    this.elementsPerPage$.next(value);
  }


  private _data: BooksWithAuthor[] = [];
  public get data(): BooksWithAuthor[] {
    return this._data;
  }
  @Input()
  public set data(value: BooksWithAuthor[]) {
    this._data = value;
    this.initPaginator();

  }

  constructor() { }

  ngOnInit(): void {
  }

  changeElementsPerPage(elementsPerPage: number): void {
    this.elementsPerPage$.next(elementsPerPage);
  }
  changePage(page: number): void {
    console.log('changePage called with page ', page);
    if (page >= 1 && page < this.getLastPage()) {
      console.log('goto page ', page);
      this.currentPage$.next(page);
    }
  }
  getLastPage(): number {
    return this.pagesNumber$.getValue();
  }

  private initPaginator(): void {
      // calculate length and pages
    this.totalLength$.next(this.data.length);
    this.totalLength$.subscribe(d => console.log('total length changed??', d))
    this.currentPage$.next(1);
    // pages$: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);
    /*
    // pages$: dipende da totalLength e pageNumber e elementsPerPage.
    // ad esempio se totalLength e' 10 e elementsPerPage e' 2 e pageNumber e' 3
    // devo avere [1 2 3 4 5], se pageNumber é 2 devo avere [1 2 3 4 ] devo mettere al piu 5 pagine:
    // pagina corrente -2, pagina corrente-1, pagina corrente, pagina corrente+1, pagina corrente+2
    */

    // pageNumber$: dipende da totalLength e elementsPerPage
    combineLatest([this.totalLength$, this.elementsPerPage$]).pipe(
      tap(([length, elementsPerPage]: [number, number]) => {
        const num = Math.ceil(length / elementsPerPage);
        this.pagesNumber$.next(num);
      })
      ).subscribe(data => console.log('triggered change on length or elementsPerPage:', data));

    combineLatest([this.currentPage$, this.totalLength$, this.elementsPerPage$]).pipe(
      distinctUntilChanged(),
      tap(([currentPage, length, elementsPerPage]: [number, number, number]) => {

       const prevPage = (currentPage-1 > 0) ? currentPage-1 : null;
       const prevPrevPage = (currentPage-2 > 0) ? currentPage-2 : null;
       const nextPage = ((currentPage+1) * elementsPerPage <= length) ? currentPage+1 : null;
       const nextNextPage = ((currentPage+2) * elementsPerPage <= length) ? currentPage+2 : null;
       const pages = [prevPrevPage, prevPage, currentPage, nextPage, nextNextPage].filter(el => !!el) as number[];

       this.pages$.next(pages);

      })
    ).subscribe(data => console.log('triggered change on currentpage length or elementsPerPage:', data));
  }
}
