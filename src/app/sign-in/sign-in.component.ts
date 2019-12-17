import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {SessionService, SignInBody} from '../session.service';
import {SessionQuery} from '../state/session/session.query';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  model: SignInBody;
  isLoading$: Observable<boolean>;
  isCompleted$: Observable<boolean>;
  error$: Observable<HttpErrorResponse>;

  constructor(private sessionService: SessionService,
              private sessionQuery: SessionQuery) { }

  ngOnInit() {
    this.model = new SignInBody('', '');
    this.isLoading$ = this.sessionQuery.selectLoading();
    this.isCompleted$ = this.sessionQuery.isLoggedIn$;
    this.error$ = this.sessionQuery.selectError();
  }

  onSubmit() {
    this.sessionService.signIn(this.model);
  }
}
