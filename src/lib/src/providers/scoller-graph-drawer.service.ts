import { Injectable } from '@angular/core';
import { ScrollerOptionsInterface } from '../interfaces/scroller-options.interface';

@Injectable()
export class ScrollerGraphDrawerService {
  DEFAULT_OPTIONS: ScrollerOptionsInterface = {
    graphHeight: 50,
    graphWidth: 500,
    scrollBorderWidth: 5,
    graphBorderWidth: 1,
    scrollerWidth: 20
  };

  constructor() {  }

  initializeScrollerOptions(opts: ScrollerOptionsInterface): ScrollerOptionsInterface {
    return Object.assign({}, this.DEFAULT_OPTIONS, opts);
  }

  drawGraph(ctx: CanvasRenderingContext2D, graphWidth: number, _graphHeight: number): void {
    this.drawTimeTicks(ctx, graphWidth, 20);
  }

  private drawTimeTicks(ctx: CanvasRenderingContext2D, graphWidth: number, interval: number): void {
    for(let i = interval; i < graphWidth; i+=interval) {
      this.drawTimeTick(ctx, i, 0, 20);
    }
  }

  private drawTimeTick(ctx: CanvasRenderingContext2D, x: number, y: number, length: number): void {
    ctx.moveTo(x, y);
    let yTo = (y > 0) ? y - length : y + length;
    ctx.lineTo(x, yTo);
    ctx.stroke();
  }
}
