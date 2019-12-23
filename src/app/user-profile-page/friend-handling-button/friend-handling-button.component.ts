import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {UserService} from '../../user.service';
import {NotificationService} from '../../notification.service';

@Component({
  selector: 'app-friend-handling-button',
  templateUrl: './friend-handling-button.component.html',
  styleUrls: ['./friend-handling-button.component.css']
})
export class FriendHandlingButtonComponent implements OnChanges {
  @Input() relationToViewer: string;
  @Input() userId: number;
  buttonClass: string;
  buttonText: string;
  private buttonValues = {
    FRIEND: {
      text: 'You are friends',
      class: 'btn-secondary'
    },
    USER: {
      text: 'Add as a friend',
      class: 'btn-info'
    },
    REQUEST_SENT: {
      text: 'Friend request sent',
      class: 'btn-info'
    },
    REQUEST_SENT_HOVER: {
      text: 'Cancel sent request',
      class: 'btn-danger'
    },
    FRIEND_HOVER: {
      text: 'Remove from friends',
      class: 'btn-danger'
    }
  };

  constructor(private userService: UserService,
              private notificationService: NotificationService) { }

  ngOnChanges(changes: SimpleChanges): void {
    switch (this.relationToViewer) {
      case 'FRIEND':
        this.buttonText = 'You are friends';
        this.buttonClass = 'btn-secondary';
        break;
      case 'USER':
        this.buttonText = 'Add as a friend';
        this.buttonClass = 'btn-info';
        break;
      default:
        break;
    }
  }

  mouseEnter() {
    if (this.relationToViewer === 'FRIEND') {
      this.relationToViewer = 'FRIEND_HOVER';
    } else if (this.relationToViewer === 'REQUEST_SENT') {
      this.relationToViewer = 'REQUEST_SENT_HOVER';
    } else {
      return;
    }
  }

  mouseLeave() {
    if (this.relationToViewer === 'FRIEND_HOVER') {
      this.relationToViewer = 'FRIEND';
    } else if (this.relationToViewer === 'REQUEST_SENT_HOVER') {
      this.relationToViewer = 'REQUEST_SENT';
    } else {
      return;
    }
  }

  handleClick() {
    switch (this.relationToViewer) {
      case 'FRIEND_HOVER':
        this.removeFriend();
        break;
      case 'USER':
        this.sendFriendRequest();
        break;
      case 'REQUEST_SENT_HOVER':
        this.cancelFriendRequest();
        break;
    }
  }

  removeFriend() {
    this.userService.deleteFriend(this.userId)
      .subscribe(_ => {
        this.notificationService.showSuccess('Friend removed');
        this.relationToViewer = 'USER';
      });
  }

  sendFriendRequest() {
    this.userService.friendRequest('SEND', this.userId)
      .subscribe(_ => {
        this.notificationService.showSuccess('Friend request sent');
        this.relationToViewer = 'REQUEST_SENT'; // TODO 'FOLLOWER' relation
      });
  }

  cancelFriendRequest() {
    this.userService.friendRequest('CANCEL', this.userId)
      .subscribe(_ => {
        this.notificationService.showSuccess('Friend request cancelled');
        this.relationToViewer = 'USER';
      });
  }
}
