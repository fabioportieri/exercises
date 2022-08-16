import { BehaviorSubject, combineLatest, Observable } from "rxjs";
import { RxjsPaginatorComponent } from "./rxjs-paginator.component";
import { map, tap } from 'rxjs/operators';

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
  constructor(private paginator: P) {

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


    combineLatest([
      this.paginator.datasource$,
      elementsPerPage$,
      currentPage$,
    ]).pipe(
      map(([datasource, elements, page]) => {
       const dataStartOffset = elements * (page - 1);
       let dataEndOffset = (datasource.length-1 < dataStartOffset + elements - 1) ? datasource.length-1 : dataStartOffset + elements - 1;
       return {dataStartOffset, dataEndOffset, datasource}
      }),
      tap(x => console.log('datasource pipeline: ', x)),
      map(({dataStartOffset, dataEndOffset, datasource}) => (datasource.slice(dataStartOffset, dataEndOffset+1)))
    ).subscribe(this.dataFiltered); // shorthand notation for: .subscribe((data) => this.dataFiltered.next(data));

  }

}
