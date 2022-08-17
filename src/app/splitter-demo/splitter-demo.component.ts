import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-splitter-demo',
  template: `



      <app-splitter [style]="{'height': '300px'}" styleClass="mb-5">
            <ng-template>
                <div class="panel col flex align-items-center justify-content-center">
                    Panel 1
                </div>
            </ng-template>
            <ng-template>
                <div class="panel col flex align-items-center justify-content-center">
                    Panel 2
                </div>
            </ng-template>
        </app-splitter>

  `,
  styles: [`
  .panel {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  `]
})
export class SplitterDemoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
