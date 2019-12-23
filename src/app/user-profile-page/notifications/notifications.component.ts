import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import FriendResponse from '../FriendResponse';
import UserNotificationsQuery from './user-notifications.query';
import {UserNotificationsService} from './user-notifications.service';
import {UserService} from '../../user.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit, OnDestroy {
  friendRequests: FriendResponse[];
  checkIntervalMs = 7000;
  timerId: number;

  dropdownToggled = false;

  constructor(private userService: UserService,
              private notificationsService: UserNotificationsService,
              private notificationsQuery: UserNotificationsQuery) { }

  ngOnInit() {
    this.fetchNotifications();
    this.timerId = setInterval(() => this.fetchNotifications(), this.checkIntervalMs);

    this.notificationsQuery.selectAll()
      .subscribe(friendRequests => {
        this.friendRequests = friendRequests;
      });
  }

  ngOnDestroy() {
    clearInterval(this.timerId);
  }

  private fetchNotifications() {
    this.notificationsService.fetchNotifications();
  }

  toggleNotificationDropdown() {
    this.dropdownToggled = !this.dropdownToggled;
  }

  handleFriendRequest(action: 'DECLINE' | 'ACCEPT', friendId: number) {
    this.userService.friendRequest(action, friendId)
      .subscribe(_ => {
        this.notificationsService.removeNotification(friendId);
      });
  }
}
