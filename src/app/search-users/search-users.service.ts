import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import PaginationQuery from '../shared/PaginationQuery';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {PaginationResponse} from '@datorama/akita';
import FriendResponse from '../user-profile-page/FriendResponse';
import {map} from 'rxjs/operators';
import {plainToClass} from 'class-transformer';

@Injectable({
  providedIn: 'root'
})
export class SearchUsersService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  fetchUsers(type: 'ANY' | 'FRIENDS',
             paginationQuery: PaginationQuery,
             name?: string,
             lastName?: string): Observable<PaginationResponse<FriendResponse>> {
    let url;
    switch (type) {
      case 'ANY':
        url = `${this.apiUrl}/users/search`;
        break;
      case 'FRIENDS':
        url = `${this.apiUrl}/friends`;
        break;
    }
    const params = {};
    Object.assign(params, paginationQuery, {name, lastName});
    return this.http.get<PaginationResponse<FriendResponse>>(url, {params})
      .pipe(
        map(res => {
          res.data = res.data.map(friendResponse => plainToClass(FriendResponse, friendResponse));
          return res;
        })
      );
  }
}
