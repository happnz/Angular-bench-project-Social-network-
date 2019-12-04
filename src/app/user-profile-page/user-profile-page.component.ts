import { Component, OnInit } from '@angular/core';
import UserProfile from './UserProfile';
import {UserService} from '../user.service';
import {ActivatedRoute} from '@angular/router';
import Friend from './Friend';
import {Relation} from './Relation';

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.scss']
})
export class UserProfilePageComponent implements OnInit {
  userProfile: UserProfile;
  relationToViewer: Relation;

  constructor(private userService: UserService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    const userId = +this.route.snapshot.paramMap.get('id');
    this.userService.getUserProfile(userId)
      .subscribe(respData => {
        this.userProfile =
          new UserProfile(respData.id,
            respData.name,
            respData.lastName,
            respData.friends.map(respFriend => new Friend(respFriend.id, respFriend.name, respFriend.lastName)),
            respData.posts,
            respData.friendRequests.map(respFriendRequest =>
              new Friend(respFriendRequest.id, respFriendRequest.name, respFriendRequest.lastName)));
      });
  }

}
