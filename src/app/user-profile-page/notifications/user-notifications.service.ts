import { Injectable } from '@angular/core';
import {UserService} from '../../user.service';
import {UserNotificationsStore} from './user-notifications.store';
import {map} from 'rxjs/operators';
import {plainToClass} from 'class-transformer';
import FriendResponse from '../FriendResponse';

@Injectable({
  providedIn: 'root'
})
export class UserNotificationsService {

  constructor(private userService: UserService,
              private notificationsStore: UserNotificationsStore) { }

  fetchNotifications() {
    this.userService.getUserProfile()
      .pipe(
        map((userProfile): FriendResponse[] => userProfile.friendRequests.map(data => plainToClass(FriendResponse, data)))
      )
      .subscribe(data => {
        this.notificationsStore.add(data);
      });
  }

  removeNotification(id: number) {
    this.notificationsStore.remove(id);
  }
}
