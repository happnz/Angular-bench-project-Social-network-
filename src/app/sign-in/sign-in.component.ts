import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {SessionService, SignInBody} from '../session.service';
import {SessionQuery} from '../state/session/session.query';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {SessionStore} from '../state/session/session.store';
import {UserService} from '../user.service';
import {Router} from '@angular/router';

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
  private sessionService: SessionService;
  public sessionQuery: SessionQuery;

  constructor(userService: UserService,
              http: HttpClient,
              router: Router) {
    const store = new SessionStore();
    this.sessionService = new SessionService(store, userService, http, router);
    this.sessionQuery = new SessionQuery(store);
  }

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
