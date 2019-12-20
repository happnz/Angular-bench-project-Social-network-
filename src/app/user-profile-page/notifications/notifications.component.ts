import {Component, Input, OnInit} from '@angular/core';
import FriendResponse from '../FriendResponse';
import {UserService} from '../../user.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  @Input() friendRequests: FriendResponse[];

  dropdownToggled = false;

  constructor(private userService: UserService) { }

  ngOnInit() {}

  toggleNotificationDropdown() {
    this.dropdownToggled = !this.dropdownToggled;
  }

  handleFriendRequest(action: 'DECLINE' | 'ACCEPT', friendId: number) {
    this.userService.friendRequest(action, friendId)
      .subscribe(_ => {
        this.friendRequests = this.friendRequests.filter(request => request.id !== friendId);
      });
  }
}
