import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-form-status',
  templateUrl: './form-status.component.html',
  styleUrls: ['./form-status.component.css']
})
export class FormStatusComponent implements OnInit {
  @Input() error$: Observable<HttpErrorResponse>;
  @Input() successCondition$: Observable<boolean>;
  @Input() loading$: Observable<boolean>;
  errorText: string;

  constructor() { }

  ngOnInit() {
    this.error$.subscribe((err) => {
      if (err) {
        this.errorText = err.statusText;
      }
    });
  }

}
