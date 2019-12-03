import { Component, OnInit } from '@angular/core';
import {User} from '../user';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';
import {catchError, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import { FormStatus } from '../shared/FormStatus';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  model: SignInBody;
  apiUrl = environment.apiUrl;
  path = 'sign-in';
  status: FormStatus = FormStatus.NOT_SUBMITTED;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
    this.model = new SignInBody('', '');
  }

  onSubmit() {
    this.status = FormStatus.SENDING;
    const headers = new HttpHeaders({ 'Content-Type' : 'application/json'});
    console.log(this.model);
    this.http.post<User>(`${this.apiUrl}/${this.path}`, this.model, {headers})
      .pipe(
        catchError(err => {
          this.status = FormStatus.FAILED;
          return of(null);
        })
      )
      .subscribe(() => {
        if (this.status !== FormStatus.FAILED) {
          this.status = FormStatus.SUBMITTED;
          this.router.navigate(['/profile']);
        }
      });
  }

  get FormStatus() {
    return FormStatus;
  }
}

class SignInBody {
  constructor(public email: string, public password: string) {
    this.email = email;
    this.password = password;
  }
}
