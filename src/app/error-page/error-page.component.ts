import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {
  status: string;
  text: string;

  constructor(private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit() {
    const map = this.route.snapshot.queryParamMap;
    this.status = map.get('status');
    this.text = map.get('text');
  }

  goBack() {
    this.location.back();
    this.location.back();
  }
}
