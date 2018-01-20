import { NgModule } from '@angular/core';

import { ScrollerComponent } from './component/scroller.component';
import { ScrollerGraphDrawerService } from './providers/scoller-graph-drawer.service';

@NgModule({
  declarations: [ScrollerComponent],
  providers: [ScrollerGraphDrawerService],
  exports: [ScrollerComponent]
})
export class IntervalScrollerModule { }
