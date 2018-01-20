import { Component, ViewChild, OnInit, ElementRef, Input } from '@angular/core';
import { Draggable, DragEventName, DragEvent } from '@shopify/draggable';

import { ScrollerOptionsInterface } from '../interfaces/scroller-options.interface';
import { ScrollerGraphDrawerService } from '../providers/scoller-graph-drawer.service';

@Component({
  selector: 'interval-scroller',
  templateUrl: './scroller.component.html',
  styleUrls: ['./scroller.component.css']
})
export class ScrollerComponent implements OnInit {
  @Input('scrollerOptionsInput') scrollerOptionsInput: ScrollerOptionsInterface;
  @ViewChild('background') backgroundRef: ElementRef;
  @ViewChild('scroller') scroller: ElementRef;
  @ViewChild('container') container: ElementRef;

  private ctx: CanvasRenderingContext2D;
  private scrollerDraggable: Draggable;
  private scrollerOptions: ScrollerOptionsInterface;

  constructor(private scrollDrawer: ScrollerGraphDrawerService) { }

  ngOnInit(): void {
    let ctx: CanvasRenderingContext2D =
      this.backgroundRef.nativeElement.getContext('2d');

    this.scrollerOptions =
      this.scrollDrawer.initializeScrollerOptions(this.scrollerOptionsInput);

    this.scrollDrawer.drawGraph(ctx, 500, 50);

    this.scrollerDraggable = new Draggable(this.container.nativeElement, {
      draggable: 'div'
    });

    this.scrollerDraggable.on(DragEventName.Start, (draggable: DragEvent) => {
      console.log(draggable);
    })
  }

  get graphHeightPx(): string {
    return this.scrollerOptions.graphHeight + 'px';
  }

  get graphWidthPx(): string {
    return this.scrollerOptions.graphWidth + 'px';
  }

  get scrollerTopWidth(): string {
    return this.scrollerOptions.scrollBorderWidth + 'px';
  }

  get scrollerTop(): string {
    return '-' +
      (this.scrollerOptions.scrollBorderWidth - this.scrollerOptions.graphBorderWidth) + 'px';
  }

  get scrollerBorderWidthPx(): string {
    return this.scrollerOptions.graphBorderWidth + 'px';
  }

  get scrollerWidthPx(): string {
    return this.scrollerOptions.scrollerWidth + 'px';
  }
}
