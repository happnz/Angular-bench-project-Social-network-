import { Injectable } from '@angular/core';
import {SessionStore} from './state/session/session.store';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {User} from './user';
import {Router} from '@angular/router';
import {UserService} from './user.service';
import {createInitialState} from './state/session/session.state';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  apiUrl: string = environment.apiUrl;
  saveProfileToStateCallback = userResponse => {
    this.sessionStore.update({
      id: userResponse.id,
      name: userResponse.name,
      lastName: userResponse.lastName
    });
    this.sessionStore.setLoading(false);
    this.router.navigateByUrl('/profile');
  };

  handleErrorCallback = err => {
    this.sessionStore.setLoading(false);
    this.sessionStore.setError(err);
  };

  constructor(private sessionStore: SessionStore,
              private userService: UserService,
              private http: HttpClient,
              private router: Router) { }

  signIn(signInBody: SignInBody): Observable<User> {
    this.sessionStore.setLoading(true);
    return this.http.post<User>(`${this.apiUrl}/sign-in`, signInBody)
      .pipe(
        tap(_ => {
            this.userService.getUserProfile().subscribe(
              this.saveProfileToStateCallback,
              this.handleErrorCallback
            );
          },
          this.handleErrorCallback)
      );
  }

  signUp(signUpBody: User): Observable<User> {
    this.sessionStore.setLoading(true);
    return this.http.post<User>(`${this.apiUrl}/sign-up`, signUpBody)
      .pipe(
        tap(_ => {
            this.userService.getUserProfile().subscribe(
              this.saveProfileToStateCallback,
              this.handleErrorCallback
            );
          },
          this.handleErrorCallback)
      );
  }

  signOut(): Observable<any> {
    this.sessionStore.setLoading(true);
    this.clearState();
    this.router.navigateByUrl('/sign-in');
    this.sessionStore.setLoading(false);
    return this.http.post(`${this.apiUrl}/sign-out`, null);
  }

  clearState() {
    this.sessionStore.update(createInitialState());
    this.sessionStore.setLoading(false);
    this.sessionStore.setError(null);
  }

}

export class SignInBody {
  constructor(public email: string, public password: string) {
    this.email = email;
    this.password = password;
  }
}
