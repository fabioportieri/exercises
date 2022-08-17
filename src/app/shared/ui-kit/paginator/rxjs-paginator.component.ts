import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, BehaviorSubject, Observable, of } from 'rxjs';
import { distinctUntilChanged, filter, map, tap, withLatestFrom } from 'rxjs/operators';
import { BooksWithAuthor } from 'src/app/books/books.model';
import { START_PAGE, DEFAULT_CURRENT_PAGE, DEFAULT_ELEMENTS_PER_PAGE } from './paginator.constants';

@Component({
  selector: 'app-rxjs-paginator',
  template: `
    <div class="paginator" *ngIf="(currentPage$ | async) as currentPage">
      <div class="first" (click)="changePage(1)"><<</div>
      <div class="back" (click)="changePage(currentPage-1)"><</div>
      <div *ngFor="let page of pages$ | async" [class.active]="currentPage === page">
        <div class="pages" (click)="changePage(page)"> {{ page }} </div>
      </div>
      <div class="next" (click)="changePage(currentPage+1)"> > </div>
      <div class="last" (click)="changePage(getLastPage())"> >> </div>

      <div class="menu-section hidden" #formElements (mouseleave)="menuOutHandler()">

        <div class="form" >
          <input (keydown.enter)="changeElementsPerPage(elementsPerPageFC.value)"
              type="number" class="form-control" name="elementsPerPage" [formControl]="elementsPerPageFC"  />
          <span>
            change to {{elementsPerPageFC.value ?? '-'}} elements per size </span>
        </div>
        <div class="menu-icon" (mouseenter)="menuInHandler()" >
          <fa-icon [icon]="['fas', 'ellipsis-v']"></fa-icon>
        </div>
      </div>
    </div>



<!--
    <pre> number of pages: {{this.pagesNumber$ | async }} </pre>
    <pre> pages: {{this.pages$ | async | json }} </pre>
    <pre> elementsPerpages: {{this.elementsPerPage$ | async }} </pre>
    <pre> totalLength: {{this.totalLength$ | async }} </pre>
    <pre> currentPage: {{ currentPage$ | async }} </pre> -->


  `,
  styles: [`
  .paginator {
    display: flex;
    gap: 10px;
    background: #ededed;
    padding: 5px;
    justify-content: center;
    border-radius: 5px;
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

    &.menu-section {
      margin-left: auto;
      display: flex;
      width: 60%;
      transition: width .2s ease-in-out;
      &.hidden {
        width: 20px;
        .form {
          width:0px;
          & > * {
            opacity: 0;
            pointer-events: none;
            transition-delay: 0s;
            transition: all .1s ease-in-out;
          }
        }
      }
      .form {
        transition: all .2s ease-in-out;
        transition-delay: 0.2s;
        width: 100%;
        & > * {
          opacity: 1;
          pointer-events: all;
          transition: all .4s ease-in-out;
          transition-delay: 0.2s;
        }

      }
      .menu-icon {
        transition: transform .2s ease-in-out;
        font-size: 1rem;
        width: 20px;
        margin-left: auto;
        height: 20px;
        &:hover {
          transform: rotate(90deg);
        }
      }
    }

  }

  @keyframes show {
    0%   { opacity:0.0; }
    100% { opacity:1.0; }
  }

  .paginator > div.active {
    border-color: #a9caed;
    color: #021120;
  }
  `],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RxjsPaginatorComponent<T> implements OnInit {


  pagesNumber$: BehaviorSubject<number> = new BehaviorSubject<number>(START_PAGE);
  pages$: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);
  elementsPerPage$: BehaviorSubject<number> = new BehaviorSubject<number>(DEFAULT_ELEMENTS_PER_PAGE);
  currentPage$: BehaviorSubject<number> = new BehaviorSubject<number>(DEFAULT_CURRENT_PAGE);
  totalLength$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  datasource$: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]); // subject needed to synchronize paginator data with datsource

  elementsPerPageFC: FormControl = new FormControl();


  @ViewChild('formElements') formElements!: ElementRef<HTMLDivElement>;

  private _pageSize = 2;
  public get pageSize() {
    return this._pageSize;
;
  }

  @Input()
  public set pageSize(value: number) {
    this._pageSize = value;
    this.elementsPerPage$.next(value);
  }


  private _data: T[] = [];
  public get data(): T[] {
    return this._data;
  }
  @Input()
  public set data(value: T[]) {
    this._data = value;
    this.datasource$.next(value);
    this.totalLength$.next(this.data.length);
    this.currentPage$.next(DEFAULT_CURRENT_PAGE);
  }

  constructor() { }

  ngOnInit(): void {
    this.initPaginator();
  }

  changeElementsPerPage(elementsPerPage: number): void {
    console.log('key down enter');
    this.elementsPerPage$.next(elementsPerPage);
  }
  changePage(page: number): void {
    if (page >= 1 && page <= this.getLastPage()) {
      this.currentPage$.next(page);
    }
  }
  getLastPage(): number {
    return this.pagesNumber$.getValue();
  }

  private initPaginator(): void {
      // calculate length and pages


    // pageNumber$: dipende da totalLength e elementsPerPage
    combineLatest([this.totalLength$, this.elementsPerPage$]).pipe(
      tap(([length, elementsPerPage]: [number, number]) => {
        const num = Math.ceil(length / elementsPerPage);
        this.pagesNumber$.next(num);
      })
    ).subscribe();

    // if currentPage > totalePages reset currentPage
    this.pagesNumber$.pipe(
      withLatestFrom(this.currentPage$),
      filter(([numpagesTot, currentPage]: [number, number]) => currentPage > numpagesTot)
    ).subscribe(() => this.currentPage$.next(DEFAULT_CURRENT_PAGE))

    combineLatest([this.currentPage$, this.totalLength$, this.elementsPerPage$]).pipe(

      tap(([currentPage, length, elementsPerPage]: [number, number, number]) => {

       const prevPage = (currentPage-1 > 0) ? currentPage-1 : null;
       const prevPrevPage = (currentPage-2 > 0) ? currentPage-2 : null;
       const nextPage = ((currentPage) * elementsPerPage < length) ? currentPage+1 : null;
       const nextNextPage = ((currentPage+1) * elementsPerPage < length) ? currentPage+2 : null;
       const pages = [prevPrevPage, prevPage, currentPage, nextPage, nextNextPage].filter(el => !!el) as number[];

       this.pages$.next(pages);

      })
    ).subscribe();
  }


  menuOutHandler(): void {
    this.formElements.nativeElement.classList.add("hidden");
    console.log('out', this.formElements.nativeElement.classList);
  }
  menuInHandler(): void {
    this.formElements.nativeElement.classList.remove("hidden");
    console.log('in', this.formElements.nativeElement.classList);
  }

  menuHandler(): void {
    this.formElements.nativeElement.classList.toggle("hidden");
    // console.log('handler menu', this.formElements.nativeElement.classList);
  }
}
