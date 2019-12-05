import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {UserService} from '../../user.service';

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

  constructor(private userService: UserService) { }

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
    if (this.relationToViewer !== 'FRIEND') {
      return;
    }
    this.buttonText = 'Remove from friends';
    this.buttonClass = 'btn-danger';
  }

  mouseLeave() {
    if (this.relationToViewer !== 'FRIEND') {
      return;
    }
    this.buttonText = 'You are friends';
    this.buttonClass = 'btn-secondary';
  }

  handleClick() {
    switch (this.relationToViewer) {
      case 'FRIEND':
        this.removeFriend();
        break;
      case 'USER':
        this.sendFriendRequest();
        break;
    }
  }

  removeFriend() {
    this.userService.deleteFriend(this.userId)
      .subscribe(_ => {
        this.relationToViewer = 'USER';
        this.buttonText = 'Add as a friend';
        this.buttonClass = 'btn-info';
      });
  }

  sendFriendRequest() {
    this.userService.friendRequest('SEND', this.userId)
      .subscribe(_ => {
        this.relationToViewer = 'USER';
        this.buttonText = 'Friend request sent'; // TODO 'FOLLOWER' relation
        this.buttonClass = 'btn-info';
      });
  }
}
