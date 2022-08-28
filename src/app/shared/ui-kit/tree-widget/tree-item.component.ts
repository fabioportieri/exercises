import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, Input, HostListener, EventEmitter, Output } from '@angular/core';
import { TreeDataService } from './tree-data-source';
import { FlatNodeView } from './tree-widget-model';

@Component({
  selector: 'app-tree-item',
  template: `
    <div class="scroller-item-view" *ngIf="node && !node.hidden">
      <div class="tree-item treeNodes" [class.highlighted]="hovered">
        <div class="item-content">
          <div class="node-indentation">
            <div class="indentation-flex">


              <span class="indentation-unit" *ngFor="let levelcap of [].constructor(node.level-1); let curr_level_index = index;"
                [class.vertical-line-extension]="hasVerticalLineIndentationClass(curr_level_index, node)"
                [class.blank-extension]="hasBlankIndentationClass(curr_level_index, node)"
                [class.t-shaped-line-extension]="hasTShapedLineIndentationClass(curr_level_index, node)"
                [class.l-shaped-line-extension]="hasLShapedLineIndentationClass(curr_level_index, node)"
                [class.horizontal-line-extension]="hasHorizontalLineIndentationClass(curr_level_index, node)">
              </span>


            </div>
          </div>
          <div class="expander" *ngIf="node.expandable" (click)="toggle.emit(node)">
            <span class="icon material-symbols-rounded compress" [class.compressed]="node.compressed">
              chevron_right
            </span>
          </div>
          <span *ngIf="node.expandable" class="icon material-symbols-rounded">
            folder_open
          </span>
          <span *ngIf="!node.expandable" class="icon material-symbols-outlined">
            topic
          </span>
          <span class="item-text">{{node.name}}</span>
        </div>
      </div>
    </div>



  `,
  styles: [`
  :host {
    box-sizing: border-box;
  }
  /* .scroller-item-view {
  } */
  .tree-item {
    height: 30px;
    line-height: 30px;
    padding: 0;
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
    background-size: 100% 100%;
    opacity: .3;
  }
  .node-indentation .indentation-flex .indentation-unit.l-shaped-line-extension {
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAeCAYAAAAy2w7YAAAAAXNSR0IArs4c6QAAAGtJREFUSEvtldENgEAIQ+1oTsE4us6FIdwMDCb63/rb+6bX8FIAG/ky86gqRMTJSMEUT62NXmJG5zB80+MwOAz/wtDdO4CLWch06ubztRZ1IkYjGTGdyEtVMXFHKrVH5zDI+IzO6PQzobK7ARMvaxpJxe0WAAAAAElFTkSuQmCC");
  }
  .node-indentation .indentation-flex .indentation-unit.t-shaped-line-extension {

    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAeCAYAAAAy2w7YAAAAAXNSR0IArs4c6QAAAG1JREFUSEtjZCARrFy5sgGkJTw8HEwTCxiJVQhTN2oRLCRGg45hNDGMJgZ4ATKaGChKDExMTPb//v07SEqBTHIRtHr16noGBgYHmltEt8QA9RFDaGhoI02Dbvj5aDToyM6wo0E3GnTw0mbQJwYALxN9FaD0j5UAAAAASUVORK5CYII=");
  }
  .node-indentation .indentation-flex .indentation-unit.vertical-line-extension {
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAeCAYAAAAy2w7YAAAAAXNSR0IArs4c6QAAAElJREFUSEtjZCARrFy5sgGkJTw8HEwTCxiJVQhTN2oRLCRGg45hNDGMJgZ4ATKaGEYTw2hiwKhPR6uJ0WoCnihGE8NoYqB/YgAAwZV4H64lS6EAAAAASUVORK5CYII=");
  }

  .node-indentation .indentation-flex .indentation-unit.horizontal-line-extension {
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAeCAYAAAAy2w7YAAAAAXNSR0IArs4c6QAAAGFJREFUSEvtlUEKACAIBNOX9x0/aeGh8NBFA6HYbok0OS1ErWhREacBlDYNdVC3DSAMD4RBRPrpmsw8rK6q+x2t5veR8WiB/CEL4kEncAgUab7pRbzT9qAO6vBNpDPwsboJ6NEZFectcIsAAAAASUVORK5CYII=");
  }

  .node-indentation .indentation-flex .indentation-unit.blank-extension {
    background-image: none;
  }


  .expander {

    position: relative;
    display: inline-block;
    cursor: pointer;
  }

  .icon.material-symbols-outlined,
  .icon.material-symbols-rounded  {

    line-height: 30px;
    color: #3232327a;
  }
  .expander span.compress {
    transition: transform 0.2s;
    font-size: 1.8rem;
  }
  .expander span.compress.compressed {
    transform: rotate(90deg);
  }
  .highlighted .icon.material-symbols-outlined,
  .highlighted .icon.material-symbols-rounded  {
    color: #323232;
  }
  .item-text {
    padding-left: 10px;
  }

  /* material-symbols-rounded
  [class*=" icon-"][class*=" icon-"]:before,
  [class^=icon-][class^=icon-]:before, [data-icon][data-icon]:before {
    font-family: Material Symbols Rounded !important;
  } */

  `],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush // mess up change detection if immutability is not used
})
export class TreeItemComponent implements OnInit {

  hovered: boolean = false;

  @HostListener('mouseenter', ['$event']) onEnter( e: MouseEvent ) {
    this.hovered = true;
  }
  @HostListener('mouseleave', ['$event']) onLeave( e: MouseEvent ) {
    this.hovered = false;
  }
  @Input() node: FlatNodeView | null = null;

  @Output() toggle: EventEmitter<FlatNodeView> = new EventEmitter<FlatNodeView>();

  constructor(private treeDataService: TreeDataService) {

  }

  ngOnInit(): void {
  }


  /**
   *
   * method to determine if we need to add 'vertical-line' indentation class
   * this is needed in the case at the specified level there is an ancestor node which has
   * other children following the child that is the (grand)parent of this node
   *
   * if at the specified level the ancestor node is the direct parent of the current node
   * we don't need this class and return false
   *
   * @param level_index
   * @param node
   * @returns
   */
  hasVerticalLineIndentationClass(level_index: number, node: FlatNodeView): boolean {

    // console.log('hasVerticalLineIndentationClass() called', level_index, node);
    // find ancestor node relative at "level_index"
    const ancestorId = node.ancestorsIds[level_index]

    // check if ancestorId is the direct parent of the node, if so return false
    if (ancestorId === node.ancestorsIds[node.ancestorsIds.length-1]) return false;

    // now checks whether ancestor found has other children following the current node
    const ancestorNode = this.treeDataService.datasource.find(el => el.id === ancestorId);
    if (!ancestorNode) return false;


    // we must find the direct child of ancestorNode that is the ancestor of "node" too
    // once it has been found we can check in ancestorNode.childrenIds its position in the array
    // and if its in the last position it means it has no other children
    // ex:
    // node.ancestorsIds = [2,4,5]
    // ancestorNode.childrenIds = [3,4,7]
    // ancestorNodeDirectChildId = 4 ; position = 1 ; ancestorNode.childrenIds.length -1 = 2
    // hence in this example ancestorNode has one more child, must add a vertical line class

    const ancestorNodeDirectChildId = node.ancestorsIds.find(el => ancestorNode.childrenIds.includes(el));

    const position = ancestorNode.childrenIds.findIndex(el => el === ancestorNodeDirectChildId);

    if (position === ancestorNode.childrenIds.length -1) return false;

    return true;
  }


  /**
   * determine if this node at the provided level has a direct parent with other children
   *
   * @param level_index
   * @param node
   */
  hasTShapedLineIndentationClass(level_index: number, node: FlatNodeView): boolean {
    // find ancestor node relative at "level_index"
    const ancestorId = node.ancestorsIds[level_index]

    // check if ancestorId is the direct parent of the node, if not so return false
    if (ancestorId !== node.ancestorsIds[node.ancestorsIds.length-1]) return false;

    // now checks whether ancestor found has other children following the current node
    const ancestorNode = this.treeDataService.datasource.find(el => el.id === ancestorId);
    if (!ancestorNode) return false;

    if (ancestorNode.childrenIds.findIndex(el => el === node.id) !== ancestorNode.childrenIds.length - 1)
      return true;

    return false;
  }

  /**
   * determine if this node at the provided level has a direct parent with no other children
   *
   * @param level_index
   * @param node
   */
  hasLShapedLineIndentationClass(level_index: number, node: FlatNodeView): boolean {
    // TODO refactor with hasTShapedLineIndentationClass make it DRY

    // find ancestor node relative at "level_index"
    const ancestorId = node.ancestorsIds[level_index]

    // check if ancestorId is the direct parent of the node, if not so return false
    if (ancestorId !== node.ancestorsIds[node.ancestorsIds.length-1]) return false;

    // now checks whether ancestor found has other children following the current node
    const ancestorNode = this.treeDataService.datasource.find(el => el.id === ancestorId);
    if (!ancestorNode) return false;

    if (ancestorNode.childrenIds.findIndex(el => el === node.id) !== ancestorNode.childrenIds.length - 1)
      return false;

    return true;
  }

  /**
   * add this class if node is a leaf and the provided level is equal to node.level - 1
   *
   * @param level_index
   * @param node
   */
  hasHorizontalLineIndentationClass(level_index: number, node: FlatNodeView): boolean {
    if (!node.expandable && level_index === node.level - 1) return true;
    return false;
  }

  /**
   *
   * method to determine if we need to add 'blank' indentation class
   * this is needed in the case at the specified level there is an ancestor node which don't have
   * other children following the child that is the (grand)parent of this node
   *
   * if at the specified level the ancestor node is the direct parent of the current node
   * we don't need this class and return false
   *
   * @param level_index
   * @param node
   * @returns
   */
  hasBlankIndentationClass(level_index: number, node: FlatNodeView): boolean {
    //TODO refactor with hasVerticalLineIndentationClass make it DRY

    // find ancestor node relative at "level_index"
    const ancestorId = node.ancestorsIds[level_index]

    // check if ancestorId is the direct parent of the node, if so return false
    if (ancestorId === node.ancestorsIds[node.ancestorsIds.length-1]) return false;

    // now checks whether ancestor found has other children following the current node
    const ancestorNode = this.treeDataService.datasource.find(el => el.id === ancestorId);
    if (!ancestorNode) return false;


    // we must find the direct child of ancestorNode that is the ancestor of "node" too
    // once it has been found we can check in ancestorNode.childrenIds its position in the array
    // and if its in the last position it means it has no other children
    // ex:
    // node.ancestorsIds = [2,4,5]
    // ancestorNode.childrenIds = [3,4,7]
    // ancestorNodeDirectChildId = 4 ; position = 1 ; ancestorNode.childrenIds.length -1 = 2
    // hence in this example ancestorNode has one more child, must add a vertical line class

    const ancestorNodeDirectChildId = node.ancestorsIds.find(el => ancestorNode.childrenIds.includes(el));

    const position = ancestorNode.childrenIds.findIndex(el => el === ancestorNodeDirectChildId);

    if (position === ancestorNode.childrenIds.length -1) return true;

    return false;
  }

}
