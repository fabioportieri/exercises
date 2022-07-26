import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, Input } from '@angular/core';
import { combineLatest, BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BooksWithAuthor } from 'src/app/books/books.model';

@Component({
  selector: 'app-rxjs-paginator',
  template: `
    <div>
      <div class="first"></div>
      <div class="back"></div>
      <!-- <div *ngFor="let page of pages$ | async">
        {{ page }}
      </div> -->
      <div class="next"></div>
      <div class="last"></div>
    </div>
    <button (click)="changeElementsPerPage(3)" value="change to 3 elements per size">

    <pre> number of pages: {{this.pageNumber$ | async }} </pre>
    <pre> pages: {{this.pages$ | async | json }} </pre>
    <pre> elementsPerpages: {{this.elementsPerPage$ | async }} </pre>
    <pre> totalLength: {{this.totalLength$ | async }} </pre>

  `,
  styles: [
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RxjsPaginatorComponent implements OnInit {

  pageNumber$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  pages$: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);
  elementsPerPage$: BehaviorSubject<number> = new BehaviorSubject<number>(2);
  totalLength$: Observable<number> = of(0);

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

  changeElementsPerPage(elements: number): void {
    // emit subject
  }

  private initPaginator(): void {
      // calculate length and pages
    this.totalLength$ = of(this.data.length);

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
        this.pageNumber$.next(num);
      })
    ).subscribe();
  }
}
