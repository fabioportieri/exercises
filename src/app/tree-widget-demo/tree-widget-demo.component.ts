import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-tree-widget-demo',
  template: `
  <div class="container">

<!--  -->
    <app-tree-widget

    >
    </app-tree-widget>

  </div>
  `,
  styles: [`
  .container {
    display: block;
    width: 600px;
    margin: 30px auto;
  }
  `],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeWidgetDemoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
