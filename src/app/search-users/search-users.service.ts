import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import PaginationQuery from '../shared/PaginationQuery';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {PaginationResponse} from '@datorama/akita';
import {map} from 'rxjs/operators';
import {plainToClass} from 'class-transformer';
import FriendWithRelationResponse from '../user-profile-page/FriendWithRelationResponse';

@Injectable({
  providedIn: 'root'
})
export class SearchUsersService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  fetchUsers(paginationQuery: PaginationQuery,
             name?: string,
             lastName?: string): Observable<PaginationResponse<FriendWithRelationResponse>> {
    const params = {};
    Object.assign(params, paginationQuery, {name, lastName});
    return this.http.get<PaginationResponse<FriendWithRelationResponse>>(`${this.apiUrl}/users/search`, {params})
      .pipe(
        map(res => {
          res.data = res.data.map(friendResponse => plainToClass(FriendWithRelationResponse, friendResponse));
          return res;
        })
      );
  }

  fetchFriends(userId: number,
               paginationQuery: PaginationQuery,
               name?: string,
               lastName?: string): Observable<PaginationResponse<FriendWithRelationResponse>> {
    const params = {};
    if (userId === 0) {
      userId = null;
    }
    Object.assign(params, paginationQuery, {userId, name, lastName});
    return this.http.get<PaginationResponse<FriendWithRelationResponse>>(`${this.apiUrl}/friends`, {params})
      .pipe(
        map(res => {
          res.data = res.data.map(friendResponse => plainToClass(FriendWithRelationResponse, friendResponse));
          return res;
        })
      );
  }
}
