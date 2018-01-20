import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IntervalScrollerModule } from 'interval-scroller';

import { AppComponent }  from './app.component';

@NgModule({
  imports:      [ BrowserModule, IntervalScrollerModule],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
