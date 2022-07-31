import { BehaviorSubject, combineLatest, Observable, of } from "rxjs";
import { BooksWithAuthor } from "src/app/books/books.model";
import { RxjsPaginatorComponent } from "./rxjs-paginator.component";
import { distinctUntilChanged, filter, map, tap, withLatestFrom } from 'rxjs/operators';
import { ChangeDetectorRef } from "@angular/core";

/*
il concetto qui e' di incapsulare la logica fuori dal paginatore (Single responsability principle)
dentro una classe dedicata.
Il componente che usa la tabella nell onInit fara' un tableSource.connect() e poi recuperera' i dati da .getData()
e li usera nella sua tabella

previsto un secondo tipo generico P, che e la classe del paginatore, che di default e' RxjsPaginatorComponent
cosi che in futuro possa essere estendibile

*/
export class TableDataSource<T, P extends RxjsPaginatorComponent<T> = RxjsPaginatorComponent<T>> {

  private dataFiltered: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
  constructor(private paginator: P, private cd: ChangeDetectorRef) {

  }

  connect(): void {
    // subscribe paginator observables and filter data accordingly. store filtered data in dataFiltered
    // so that table can use it

    this._setFilteredData();
  }

  disconnect(): void {
    // unsubscribe paginator
  }

  getData(): Observable<T[]> {
    return this.dataFiltered.asObservable();

  }

  private _setFilteredData(): void {


    const elementsPerPage$ = this.paginator.elementsPerPage$;
    const currentPage$ = this.paginator.currentPage$;


    // dataFiltered
    combineLatest([this.paginator.datasource$, elementsPerPage$, currentPage$]).pipe(
      map(([datasource, elements, page]) => {
       const dataStartOffset = (page>1) ? elements * page - elements + page: elements * page - elements;
       let dataEndOffset = (datasource.length-1 < dataStartOffset + elements) ? datasource.length-1 : dataStartOffset + elements;
       return {dataStartOffset, dataEndOffset, datasource}
      }),
      tap(x => console.log('datasource pipeline: ', x)),
      tap(({dataStartOffset, dataEndOffset, datasource}) => {
        const filteredArray = datasource.slice(dataStartOffset, dataEndOffset+1);
        console.log('filtered array;', filteredArray);
        console.log('datasource', datasource);
        this.dataFiltered.next(filteredArray);
      })
    ).subscribe((_) => this.cd.detectChanges()); // run change detection since dataFiltered is rendered in template of main component

  }

}
