import { Component, OnInit } from '@angular/core';
import {User} from '../user';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';
import {catchError, tap} from 'rxjs/operators';
import {of} from 'rxjs';

enum FormStatus {
  NOT_SUBMITTED,
  SENDING,
  SUBMITTED,
  FAILED
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  model: User;
  apiUrl = environment.apiUrl;
  path = 'sign-up';
  status: FormStatus = FormStatus.NOT_SUBMITTED;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
    this.model = new User('', '', '', '');
  }

  onSubmit() {
    this.status = FormStatus.SENDING;
    const headers = new HttpHeaders({ 'Content-Type' : 'application/json'});
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
          this.router.navigate(['/']);
        }
      });
  }

  get FormStatus() {
    return FormStatus;
  }
}
