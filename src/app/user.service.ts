import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import PaginationQuery from './shared/PaginationQuery';
import PostWithAuthorResponse from './user-profile-page/PostWithAuthorResponse';
import FriendResponse from './user-profile-page/FriendResponse';
import {map} from 'rxjs/operators';
import UserProfilePublicResponse from './user-profile-page/UserProfilePublicResponse';
import {Relation} from './user-profile-page/Relation';
import UserProfileForUsersResponse from './user-profile-page/UserProfileForUsersResponse';
import UserProfileForFriendsResponse from './user-profile-page/UserProfileForFriendsResponse';
import UserProfilePersonalResponse from './user-profile-page/UserProfilePersonalResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getUserProfile(userId?: number): Observable<UserProfilePublicResponse> {
    if (!userId) {
      userId = 0;
    }
    return this.httpClient.get<any>(`${this.apiUrl}/users/${userId}/profile`)
      .pipe(
        map(data => {
          if (data.relation) {
            switch (data.relation) {
              case Relation.USER:
                return new UserProfileForUsersResponse(data.id, data.name, data.lastName,
                  data.friends.map(friend => new FriendResponse(friend.id, friend.name, friend.lastName)));
              case Relation.FRIEND:
                return new UserProfileForFriendsResponse(data.id, data.name, data.lastName,
                  data.friends.map(friend => new FriendResponse(friend.id, friend.name, friend.lastName)),
                  data.posts);
              case Relation.PERSONAL:
                return new UserProfilePersonalResponse(data.id, data.name, data.lastName,
                    data.friends.map(friend => new FriendResponse(friend.id, friend.name, friend.lastName)),
                    data.posts,
                    data.friendRequests.map(friend => new FriendResponse(friend.id, friend.name, friend.lastName)));
            }
          } else {
            return new UserProfilePublicResponse(data.id, data.name, data.lastName);
          }
        })
      );
  }

  deletePost(postId: number): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/posts/${postId}`);
  }

  deleteFriend(friendId: number): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/friends/${friendId}`);
  }

  friendRequest(action: 'SEND' | 'CANCEL' | 'DECLINE' | 'ACCEPT', friendId: number): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/friendRequests?action=${action}&userId=${friendId}`, null);
  }

  addPost(text: string): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/posts`, {text});
  }

  getNews(paginationQuery: PaginationQuery): Observable<PostWithAuthorResponse[]> {
    return this.httpClient.get<PostWithAuthorResponse[]>(`${this.apiUrl}/news`, {params: paginationQuery as any})
      .pipe(
        map(results =>
          results.map(res =>
            new PostWithAuthorResponse(res.id, res.text, res.createdAt, res.updatedAt,
              new FriendResponse(res.author.id, res.author.name, res.author.lastName)))));
  }
}
