import { Component, OnInit } from '@angular/core';
import {User} from '../user';
import {SessionService} from '../session.service';
import {Observable} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {SessionQuery} from '../state/session/session.query';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  model: User;
  isLoading$: Observable<boolean>;
  error$: Observable<HttpErrorResponse>;

  constructor(
    private sessionService: SessionService,
    public sessionQuery: SessionQuery
  ) { }

  ngOnInit() {
    this.model = new User('', '', '', '');
    this.isLoading$ = this.sessionQuery.selectLoading();
    this.error$ = this.sessionQuery.selectError();
  }

  onSubmit() {
    this.sessionService.signUp(this.model);
  }
}
