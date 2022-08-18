import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-tree-widget-demo',
  template: `
    <app-tree-widget></app-tree-widget>
  `,
  styles: [
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeWidgetDemoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
