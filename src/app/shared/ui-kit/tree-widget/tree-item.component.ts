import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-tree-item',
  template: `
    <div class="scroller-item-view">
      <div class="tree-item treeNodes highlighted">
        <div class="item-content">
          <div class="node-indentation">
            <div class="indentation-flex">

            <span class="indentation-unit no-horizontal-line-extension"></span>

            <span class="indentation-unit">
            </span>

              <span class="indentation-unit no-vertical-line-extension"></span>
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
  .node-indentation .indentation-flex {
    display: flex;
  }
  .node-indentation .indentation-flex .indentation-unit {
    width: 26px;
    height: 30px;
    display: inherit;
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAeCAYAAAAy2w7YAAAAAXNSR0IArs4c6QAAAG1JREFUSEtjZCARrFy5sgGkJTw8HEwTCxiJVQhTN2oRLCRGg45hNDGMJgZ4ATKaGChKDExMTPb//v07SEqBTHIRtHr16noGBgYHmltEt8QA9RFDaGhoI02Dbvj5aDToyM6wo0E3GnTw0mbQJwYALxN9FaD0j5UAAAAASUVORK5CYII=");
    background-size: 100% 100%;
    opacity: .3;
  }
  .node-indentation .indentation-flex .indentation-unit.no-horizontal-line-extension {
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAeCAYAAAAy2w7YAAAAAXNSR0IArs4c6QAAAElJREFUSEtjZCARrFy5sgGkJTw8HEwTCxiJVQhTN2oRLCRGg45hNDGMJgZ4ATKaGEYTw2hiwKhPR6uJ0WoCnihGE8NoYqB/YgAAwZV4H64lS6EAAAAASUVORK5CYII=");
  }

  .node-indentation .indentation-flex .indentation-unit.no-vertical-line-extension {
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAeCAYAAAAy2w7YAAAAAXNSR0IArs4c6QAAAGFJREFUSEvtlUEKACAIBNOX9x0/aeGh8NBFA6HYbok0OS1ErWhREacBlDYNdVC3DSAMD4RBRPrpmsw8rK6q+x2t5veR8WiB/CEL4kEncAgUab7pRbzT9qAO6vBNpDPwsboJ6NEZFectcIsAAAAASUVORK5CYII=");
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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeItemComponent implements OnInit {

  @Input() level: number = 1;

  constructor() { }

  ngOnInit(): void {
  }

}
