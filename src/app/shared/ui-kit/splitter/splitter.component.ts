import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, EventEmitter, Output, Input, ContentChildren, ViewChild, ElementRef, TemplateRef, QueryList, ChangeDetectorRef } from '@angular/core';
import { DomHandler } from '../../domhandler';

@Component({
  selector: 'app-splitter',
  template: `
        <div #container [ngClass]="containerClass()" [class]="styleClass" [ngStyle]="style">
            <ng-template ngFor let-panel let-i="index" [ngForOf]="panels">
                <div [ngClass]="panelContainerClass()" [class]="panelStyleClass" [ngStyle]="panelStyle">
                    <ng-container *ngTemplateOutlet="panel"></ng-container>
                </div>
                <div class="p-splitter-gutter" *ngIf="i !== (panels.length - 1)" [ngStyle]="gutterStyle()"
                    (mousedown)="onGutterMouseDown($event, i)" (touchstart)="onGutterTouchStart($event, i)">
                    <div class="p-splitter-gutter-handle"></div>
                </div>
            </ng-template>
        </div>
  `,
  styleUrls: ['./splitter.css','./splitter-theme.css'],
  host: {
    'class': 'p-element',
    '[class.p-splitter-panel-nested]': 'nested'
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SplitterComponent implements OnInit {

  @Input() styleClass = '';

  @Input() panelStyleClass = '';

  @Input() style: any;

  @Input() panelStyle: any;

  @Input() stateStorage: string = "session";

  @Input() stateKey: string | null = null;

  @Input() layout: string = "horizontal";

  @Input() gutterSize: number = 4;

  @Input() minSizes: number[] = [];

  @Output() onResizeEnd: EventEmitter<any> = new EventEmitter();

  @Output() onResizeStart: EventEmitter<any> = new EventEmitter();

  @ContentChildren(TemplateRef) templates!: QueryList<TemplateRef<any>>;

  @ViewChild('container', { static: false }) containerViewChild!: ElementRef<any>;

  @Input() get panelSizes(): number[] {
      return this._panelSizes;
  }

  set panelSizes(val: number[]) {
      this._panelSizes = val;

      if (this.el && this.el.nativeElement && this.panels.length > 0) {
          let children = [...this.el.nativeElement.children[0].children].filter(child => DomHandler.hasClass(child, 'p-splitter-panel'));
          let _panelSizes = [];

          this.panels.map((panel, i) => {
              let panelInitialSize = this.panelSizes.length -1 >= i ? this.panelSizes[i]: null;
              let panelSize = panelInitialSize || (100 / this.panels.length);
              _panelSizes[i] = panelSize;
              children[i].style.flexBasis = 'calc(' + panelSize + '% - ' + ((this.panels.length - 1) * this.gutterSize) + 'px)';
          });
      }
  }

  nested = false;

  panels: any[] = [];

  dragging = false;

  mouseMoveListener: ((event: any) => void) | null = null;

  mouseUpListener: ((event: any) => void) | null = null;

  touchMoveListener: ((event: any) => void) | null = null;

  touchEndListener: ((event: any) => void) | null = null;

  size: number | null = null;

  gutterElement: HTMLElement | null = null;

  startPos: number | null = null;

  prevPanelElement: HTMLElement | null = null;

  nextPanelElement: HTMLElement | null = null;

  nextPanelSize: number | null = null;

  prevPanelSize: number | null = null;

  _panelSizes: number[] = [];

  prevPanelIndex: number | null = null;

  constructor(public cd: ChangeDetectorRef, private el: ElementRef) { }

  ngOnInit() {
      this.nested = this.isNested();
  }

  ngAfterContentInit() {

      this.templates.forEach((item) => {
        this.panels.push(item);
      })
  }


  resizeStart(event: any, index: number): void {
    if (!event.currentTarget) return;

    this.gutterElement = event.currentTarget as HTMLElement;
    this.size = this.horizontal() ? DomHandler.getWidth(this.containerViewChild.nativeElement) : DomHandler.getHeight(this.containerViewChild.nativeElement);
    this.dragging = true;
    this.startPos = this.horizontal() ? (event.pageX || event.changedTouches[0].pageX) : (event.pageY || event.changedTouches[0].pageY);
    this.prevPanelElement = this.gutterElement.previousElementSibling as HTMLElement;
    this.nextPanelElement = this.gutterElement.nextElementSibling as HTMLElement;
    this.prevPanelSize = 100 * (this.horizontal() ? DomHandler.getOuterWidth(this.prevPanelElement, true): DomHandler.getOuterHeight(this.prevPanelElement, true)) / this.size;
    this.nextPanelSize = 100 * (this.horizontal() ? DomHandler.getOuterWidth(this.nextPanelElement, true): DomHandler.getOuterHeight(this.nextPanelElement, true)) / this.size;
    this.prevPanelIndex = index;
    DomHandler.addClass(this.gutterElement, 'p-splitter-gutter-resizing');
    DomHandler.addClass(this.containerViewChild.nativeElement, 'p-splitter-resizing');
    this.onResizeStart.emit({originalEvent: event, sizes: this._panelSizes});
  }

  onResize(event: any) {
      let newPos;
      if (this.horizontal())
          newPos = (event.pageX * 100 / this.size!) - (this.startPos! * 100 / this.size!);
      else
          newPos = (event.pageY  * 100 / this.size!) - (this.startPos! * 100 / this.size!);

      let newPrevPanelSize = this.prevPanelSize! + newPos;
      let newNextPanelSize = this.nextPanelSize! - newPos;

      if (this.validateResize(newPrevPanelSize, newNextPanelSize)) {
          this.prevPanelElement!.style.flexBasis = 'calc(' + newPrevPanelSize + '% - ' + ((this.panels.length - 1) * this.gutterSize) + 'px)';
          this.nextPanelElement!.style.flexBasis = 'calc(' + newNextPanelSize + '% - ' + ((this.panels.length - 1) * this.gutterSize) + 'px)';
          this._panelSizes[this.prevPanelIndex!] = newPrevPanelSize;
          this._panelSizes[this.prevPanelIndex! + 1] = newNextPanelSize;
      }
  }

  resizeEnd(event: MouseEvent | TouchEvent) {
      if (this.isStateful()) {
          this.saveState();
      }

      this.onResizeEnd.emit({originalEvent: event, sizes: this._panelSizes});
      DomHandler.removeClass(this.gutterElement, 'p-splitter-gutter-resizing');
      DomHandler.removeClass(this.containerViewChild.nativeElement, 'p-splitter-resizing');
      this.clear();
  }

  onGutterMouseDown(event: MouseEvent, index: number) {
      this.resizeStart(event, index);
      this.bindMouseListeners();
  }

  onGutterTouchStart(event: TouchEvent, index: number) {
      if (event.cancelable){
          this.resizeStart(event, index);
          this.bindTouchListeners();

          event.preventDefault();
      }
  }

  onGutterTouchEnd(event: TouchEvent) {
      this.resizeEnd(event);
      this.unbindTouchListeners();

      if (event.cancelable)
          event.preventDefault();
  }

  validateResize(newPrevPanelSize: number, newNextPanelSize: number) {
      if (this.minSizes.length >= 1 && this.minSizes[0] && this.minSizes[0] > newPrevPanelSize) {
          return false;
      }

      if (this.minSizes.length > 1 && this.minSizes[1] && this.minSizes[1] > newNextPanelSize) {
          return false;
      }

      return true;
  }

  bindMouseListeners() {
      if (!this.mouseMoveListener) {
          this.mouseMoveListener = event => this.onResize(event)
          document.addEventListener('mousemove', this.mouseMoveListener);
      }

      if (!this.mouseUpListener) {
          this.mouseUpListener = event => {
              this.resizeEnd(event);
              this.unbindMouseListeners();
          }
          document.addEventListener('mouseup', this.mouseUpListener);
      }
  }

  bindTouchListeners() {
      if (!this.touchMoveListener) {
          this.touchMoveListener = event => this.onResize(event.changedTouches[0])
          document.addEventListener('touchmove', this.touchMoveListener);
      }

      if (!this.touchEndListener) {
          this.touchEndListener = event => {
              this.resizeEnd(event);
              this.unbindTouchListeners();
          }
          document.addEventListener('touchend', this.touchEndListener);
      }
  }

  unbindMouseListeners() {
      if (this.mouseMoveListener) {
          document.removeEventListener('mousemove', this.mouseMoveListener);
          this.mouseMoveListener = null;
      }

      if (this.mouseUpListener) {
          document.removeEventListener('mouseup', this.mouseUpListener);
          this.mouseUpListener = null;
      }
  }

  unbindTouchListeners() {
      if (this.touchMoveListener) {
          document.removeEventListener('touchmove', this.touchMoveListener);
          this.touchMoveListener = null;
      }

      if (this.touchEndListener) {
          document.removeEventListener('touchend', this.touchEndListener);
          this.touchEndListener = null;
      }
  }

  clear() {
      this.dragging = false;
      this.size = null;
      this.startPos = null;
      this.prevPanelElement = null;
      this.nextPanelElement = null;
      this.prevPanelSize = null;
      this.nextPanelSize = null;
      this.gutterElement = null;
      this.prevPanelIndex = null;
  }

  isNested() {
      if (this.el.nativeElement) {
          let parent = this.el.nativeElement.parentElement;
          while (parent && !DomHandler.hasClass(parent, 'p-splitter')) {
              parent = parent.parentElement;
          }

          return parent !== null;
      }
      else {
          return false;
      }
  }

  isStateful() {
      return this.stateKey != null;
  }

  getStorage() {
      switch(this.stateStorage) {
          case 'local':
              return window.localStorage;

          case 'session':
              return window.sessionStorage;

          default:
              throw new Error(this.stateStorage + ' is not a valid value for the state storage, supported values are "local" and "session".');
      }
  }

  saveState() {
      this.getStorage().setItem(this.stateKey!, JSON.stringify(this._panelSizes));
  }

  restoreState() {
      const storage = this.getStorage();
      const stateString = storage.getItem(this.stateKey!);

      if (stateString) {
          this._panelSizes = JSON.parse(stateString);
          let children = [...this.containerViewChild.nativeElement.children].filter(child => DomHandler.hasClass(child, 'p-splitter-panel'));
          children.forEach((child, i) => {
              child.style.flexBasis = 'calc(' + this._panelSizes[i] + '% - ' + ((this.panels.length - 1) * this.gutterSize) + 'px)';
          });

          return true;
      }

      return false;
  }

  containerClass() {
      return {
          'p-splitter p-component': true,
          'p-splitter-horizontal': this.layout === "horizontal",
          'p-splitter-vertical': this.layout === "vertical"
      };
  }

  panelContainerClass() {
      return {
          'p-splitter-panel': true,
          'p-splitter-panel-nested': true
      };
  }

  gutterStyle() {
      if (this.horizontal())
          return {width: this.gutterSize + 'px'};
      else
          return {height: this.gutterSize + 'px'};
  }

  horizontal() {
      return this.layout === 'horizontal';
  }

}
