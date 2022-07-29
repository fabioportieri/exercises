import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Observable, of } from 'rxjs';
import { debounceTime, delay, switchMap, map, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-type-ahead',
  template: `
  <div class=”card”>
  <div class=”card-body”>
    <input #mioinput type=”text” id=”search-input” style="width: 25em;">
  </div>
 </div>
 <div id=”output”>
</div>
<pre> {{ res | json }}</pre>



  `,
  styleUrls: ['./type-ahead.component.scss']
})
export class TypeAheadComponent implements OnInit, AfterViewInit {

  @ViewChild('mioinput') mioinput!: ElementRef<HTMLInputElement>;

  DATA = [ "Witch Doctor", "Witch-Mage", "Lone Druid", "Axe"];
  res: string[] = [];

  constructor() { }

  ngAfterViewInit(): void {
    const searchKeyUpObservable: Observable<Event> = fromEvent(this.mioinput.nativeElement, 'keyup')!;
    searchKeyUpObservable.pipe(
      debounceTime(300),
      map((data) => (data.target as HTMLInputElement).value),
      //distinctUntilChanged()
      switchMap(searchKey => {
        return of(this.DATA.filter(d => d.indexOf(searchKey) > -1)).pipe(
          delay(100)
        );
      })
      // map(searchKey => this.filterArrays(searchKey))

    ).subscribe((data: string[])  => {
        this.res = data;
    });


  }

  filterArrays(searchKey: string): Observable<string[]> {
    return of(this.DATA.filter(d => d.indexOf(searchKey) > -1)).pipe(
      delay(100)
    );
  }


  ngOnInit(): void {

    let pippo: string | null = "dd";
    pippo = null;



  //   searchKeyUpObservable.pipe(
  //     debounceTime(300),
  //     map(e => e.target.value),
  //     distinctUntilChanged(),
  //     switchMap(keyTerm => filterArrays(keyTerm)),
  //     tap(c => (document.getElementById('output').innerText =
  //         c.join('\n')))
  //     ).subscribe(data => console.log(''))

  // }

  // filterArrays(searchKey) {
  //   return of(data.filter(hero => hero.indexOf(searchKey) > -1)).pipe(delay(100));
  }
}
