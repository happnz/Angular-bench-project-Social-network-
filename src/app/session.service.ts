import { Injectable } from '@angular/core';
import {SessionStore} from './state/session/session.store';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {User} from './user';
import {Router} from '@angular/router';
import {UserService} from './user.service';
import {createInitialState} from './state/session/session.state';

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

  signIn(signInBody: SignInBody) {
    this.sessionStore.setLoading(true);
    this.http.post<User>(`${this.apiUrl}/sign-in`, signInBody)
      .subscribe(_ => {
        this.userService.getUserProfile().subscribe(
          this.saveProfileToStateCallback,
          this.handleErrorCallback
        );
      });
  }

  signUp(signUpBody: User) {
    this.sessionStore.setLoading(true);
    this.http.post<User>(`${this.apiUrl}/sign-up`, signUpBody)
      .subscribe(_ => {
        this.userService.getUserProfile().subscribe(
          this.saveProfileToStateCallback,
          this.handleErrorCallback
        );
      });
  }

  signOut() {
    this.sessionStore.setLoading(true);
    this.http.post(`${this.apiUrl}/sign-out`, null)
      .subscribe();
    this.sessionStore.update(createInitialState());
    this.router.navigateByUrl('/sign-in');
    this.sessionStore.setLoading(false);
  }

  clearState() {
    this.sessionStore.update(createInitialState());
  }

}

export class SignInBody {
  constructor(public email: string, public password: string) {
    this.email = email;
    this.password = password;
  }
}
