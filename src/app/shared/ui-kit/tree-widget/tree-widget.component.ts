import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  NgModule,
} from '@angular/core';

// https://repo.spring.io/ui/repos/tree/General/ext-release-local/.index
@Component({
  selector: 'app-tree-widget',
  template: `
    <div class="scroller-item-view">
      <div
        tabindex="0"
        class="tree-item treeNodes highlighted"
      >
        <div class="item-content">
          <div
            class="node-indentation"
            style="width: 26px;"
          >
            <div class="indentation-flex">
              <span
                class="indentation-unit"
                style='width: 26px; height: 30px; background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAeCAYAAAAy2w7YAAAAAXNSR0IArs4c6QAAAG1JREFUSEtjZCARrFy5sgGkJTw8HEwTCxiJVQhTN2oRLCRGg45hNDGMJgZ4ATKaGChKDExMTPb//v07SEqBTHIRtHr16noGBgYHmltEt8QA9RFDaGhoI02Dbvj5aDToyM6wo0E3GnTw0mbQJwYALxN9FaD0j5UAAAAASUVORK5CYII=");'
              >
              </span>
            </div>
          </div>
          <div class="expander">
            <i class="icon icon-addons-arrow-right expanded"></i>
          </div>
          <i class="item-icon icon icon icon-jfui-folder-open"></i>
          <span class="item-text">.index</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
  :host {
    box-sizing: border-box;
  }

  .tree-item {
    height: 30px;
    line-height: 30px;
    padding: 0 12px;
    position: relative;
    user-select: none;
    width: auto;
    min-width: 100%;
  }
  .scroller-item-view {
    width: 100%;
  }

  .tree-item.highlighted:before {
    background: hsla(0,0%,56.9%,.1);
  }
  .tree-item:before {
      content: "";
      height: inherit;
      width: 100%;
      left: 0;
      right: 0;
      position: absolute;

  }
  .item-content {
    display: flex;
    white-space: nowrap;
  }
  .node-indentation {
    display: inline-block;
  }

  .node-indentation .indentation-flex .indentation-unit {
    width: 26px;
    height: 30px;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAeCAYAAAAy2w7YAAAAAXNSR0IArs4c6QAAAG1JREFUSEtjZCARrFy5sgGkJTw8HEwTCxiJVQhTN2oRLCRGg45hNDGMJgZ4ATKaGChKDExMTPb//v07SEqBTHIRtHr16noGBgYHmltEt8QA9RFDaGhoI02Dbvj5aDToyM6wo0E3GnTw0mbQJwYALxN9FaD0j5UAAAAASUVORK5CYII=);
    background-size: 100% 100%;
    opacity: .3;
  }
  .tree-item-expander {
    margin-left: -6px;
    min-width: 32px;
    position: relative;
    display: inline-block;
    cursor: pointer;
    color: #aaa;
  }
  `],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeWidgetComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

@NgModule({
  declarations: [TreeWidgetComponent],
  imports: [CommonModule],
  exports: [TreeWidgetComponent],
})
export class TreeWidgetModule {}
