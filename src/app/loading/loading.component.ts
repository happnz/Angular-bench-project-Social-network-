import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  template: '<div class="loading-icon"><i class="fa fa-spinner fa-pulse"></i></div>',
  styles: [
    `.loading-icon {
          text-align: center;
          margin: auto;
      }`
  ]
})
export class LoadingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
