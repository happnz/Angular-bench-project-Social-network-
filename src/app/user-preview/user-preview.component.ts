import {Component, Input, OnInit} from '@angular/core';
import FriendResponse from '../user-profile-page/FriendResponse';
import FriendWithRelationResponse from '../user-profile-page/FriendWithRelationResponse';

@Component({
  selector: 'app-user-preview',
  templateUrl: './user-preview.component.html',
  styleUrls: ['./user-preview.component.scss']
})
export class UserPreviewComponent implements OnInit {
  @Input() user: FriendWithRelationResponse;

  constructor() { }

  ngOnInit() {
  }

}
