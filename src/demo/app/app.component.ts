import { Component } from '@angular/core';

@Component({
  selector: 'demo-app',
  templateUrl: './app.component.html'
})
export class AppComponent {
  meaning: number;
  constructor() {
    this.meaning = 1;
    // this.meaning = libService.getMeaning();
  }
}
