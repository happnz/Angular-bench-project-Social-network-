import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getUserProfile(userId?: number): Observable<any> {
    if (!userId) {
      userId = 0;
    }
    return this.httpClient.get(`${this.apiUrl}/users/${userId}/profile`);
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
}