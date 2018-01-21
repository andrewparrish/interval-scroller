import { Component, ViewChild, OnInit, ElementRef, Input } from '@angular/core';
import { Draggable, DragEvent } from '@shopify/draggable';

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
  private scrollerLeftPosition: number;

  constructor(private scrollDrawer: ScrollerGraphDrawerService) {
    this.scrollerLeftPosition = 0;
  }

  ngOnInit(): void {
    let ctx: CanvasRenderingContext2D =
      this.backgroundRef.nativeElement.getContext('2d');

    this.scrollerOptions =
      this.scrollDrawer.initializeScrollerOptions(this.scrollerOptionsInput);

    this.scrollDrawer.drawGraph(ctx, 500, 50);

    this.scrollerDraggable = new Draggable(this.container.nativeElement, {
      draggable: 'div'
    });

    this.scrollerDraggable.on('move:start', (draggable: DragEvent) => {
    });

    this.scrollerDraggable.on('drag:move', this.setScrollerPosition);
  }

  setScrollerPosition = (draggable: DragEvent): void => {
    this.scrollerLeftPosition += draggable.sensorEvent.data.originalEvent.movementX;
  };

  get scrollerPositionLeftPx(): string {
    return this.scrollerLeftPosition + 'px';
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
