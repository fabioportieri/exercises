import { BehaviorSubject, Observable } from "rxjs";
import { BooksWithAuthor } from "src/app/books/books.model";
import { RxjsPaginatorComponent } from "./rxjs-paginator.component";

/*
il concetto qui e' di incapsulare la logica fuori dal paginatore (Single responsability principle)
dentro una classe dedicata.
Il componente che usa la tabella nell onInit fara' un tableSource.connect() e poi recuperera' i dati da .getData()
e li usera nella sua tabella

previsto un secondo tipo generico P, che e la classe del paginatore, che di default e' RxjsPaginatorComponent
cosi che in futuro possa essere estendibile

*/
export class TableDataSource<T, P extends RxjsPaginatorComponent<T> = RxjsPaginatorComponent<T>> {

  private dataToShow: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);

  constructor(private paginator: P) {

  }

  connect(): void {
    // subscribe paginator observables and filter data accordingly. store filtered data in dataToShow
    // so that table can use it
    console.log(this.paginator);
    this.dataToShow.next(this.paginator.data);
  }

  disconnect(): void {
    // unsubscribe paginator
  }

  getData(): Observable<T[]> {
    return this.dataToShow.asObservable();

  }

}
