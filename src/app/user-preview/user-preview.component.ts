import {Component, Input, OnInit} from '@angular/core';
import FriendResponse from '../user-profile-page/FriendResponse';

@Component({
  selector: 'app-user-preview',
  templateUrl: './user-preview.component.html',
  styleUrls: ['./user-preview.component.css']
})
export class UserPreviewComponent implements OnInit {
  @Input() user: FriendResponse;

  constructor() { }

  ngOnInit() {
  }

}
