## paginatore

serve meccanismo che filtra i dati a seconda del change fatto sul paginatore
ad esempio se al paginatore cambio la pagina o il numero di elementi in vista
devo mostrare i dati in tabella relativi a quella pagina, ai dati totali, e al num di elementi per pagina

(al momento il paginatore e' scollegato dai dati)

creo classe wrapper TableSource: (pseudocodice)

```
export class TableSource<T> {

  private dataToShow: BehaviorSubject<T[]>;

  constructor(private paginator: RxjsPaginator, private data: T[]); 

  connect(): void {
    // subscribe paginator observables and filter data accordingly. store filtered data in dataToShow
    // so that table can use it
  }

  disconnect(): void {
    // unsubscribe paginator
  }

  getData(): Observable<T[]> {
    return this.dataToShow.asObservable();
  }

}
```

il concetto qui e' di incapsulare la logica fuori dal paginatore (Single responsability principle)
dentro una classe dedicata.
Il componente che usa la tabella nell onInit fara' un tableSource.connect() e poi recuperera' i dati da .getData()
e li usera nella sua tabella
