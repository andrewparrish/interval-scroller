import { TestBed, inject } from '@angular/core/testing';
import { ScrollerGraphDrawerService } from './scoller-graph-drawer.service';
import { ScrollerOptionsInterface } from 'src/interfaces/scroller-options.interface';

describe('ScrollerGraphDrawerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ ScrollerGraphDrawerService ]
    })
  });

  const defaultOpts: ScrollerOptionsInterface = {
    graphHeight: 50,
    graphWidth: 500,
    scrollBorderWidth: 5,
    graphBorderWidth: 1,
    scrollerWidth: 20
  };

  describe('initialization', () => {
    it('should set up the defaults', inject([ScrollerGraphDrawerService], (service: ScrollerGraphDrawerService) => {
      expect(service.initializeScrollerOptions({})).toEqual(defaultOpts);
    }));

    describe('graph drawing', () => {
      it('should draw the graph', inject([ScrollerGraphDrawerService], (service: ScrollerGraphDrawerService) => {
        spyOn(service, 'drawTimeTicks');

        service.drawGraph(null, 50, 50);
        expect(service.drawTimeTicks).toHaveBeenCalled();
      }));
    });
  });

  describe('tick drawing', () => {
    it('can draw a tick from top to bottom',inject([ScrollerGraphDrawerService],
      (service: ScrollerGraphDrawerService) => {
        let ctx = {
          moveTo: function(),
          lineTo: function(),
          stroke: function()
        };
        spyOn(ctx, 'moveTo');
        spyOn(ctx, 'lineTo');
        spyOn(ctx, 'stroke');

        service.drawTimeTick(ctx, 0, 0, 5);
        expect(ctx.moveTo).toHaveBeenCalledWith(0, 0);
        expect(ctx.lineTo).toHaveBeenCalledWith(0, 5);
        expect(ctx.stroke).toHaveBeenCalled();
      }));
  });
});
