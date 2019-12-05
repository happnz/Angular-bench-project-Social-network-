import {Component, OnChanges, OnInit} from '@angular/core';
import UserProfilePublicResponse from './UserProfilePublicResponse';
import {UserService} from '../user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Relation} from './Relation';
import UserProfileForUsersResponse from './UserProfileForUsersResponse';
import UserProfileForFriendsResponse from './UserProfileForFriendsResponse';
import UserProfilePersonalResponse from './UserProfilePersonalResponse';
import FriendResponse from './FriendResponse';

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.scss']
})
export class UserProfilePageComponent implements OnInit {
  userProfile: UserProfilePublicResponse | UserProfileForUsersResponse | UserProfileForFriendsResponse | UserProfilePersonalResponse;
  relationToViewer: Relation;

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    const userId = +this.route.snapshot.paramMap.get('id');
    this.fetchUserProfile(userId);
    this.route.params.subscribe(params => {
      const id = params.id;
      this.fetchUserProfile(id); // reset and set based on new parameter this time
    });
  }

  fetchUserProfile(userId: number) {
    this.userService.getUserProfile(userId)
      .subscribe(data => {
        switch (data.relation) {
          case Relation.USER:
            this.userProfile = new UserProfileForUsersResponse(data.id, data.name, data.lastName,
              data.friends.map(friend => new FriendResponse(friend.id, friend.name, friend.lastName)));
            this.relationToViewer = data.relation;
            break;
          case Relation.FRIEND:
            this.userProfile = new UserProfileForFriendsResponse(data.id, data.name, data.lastName,
              data.friends.map(friend => new FriendResponse(friend.id, friend.name, friend.lastName)),
              data.posts);
            this.relationToViewer = data.relation;
            break;
          case Relation.PERSONAL:
            this.userProfile =
              new UserProfilePersonalResponse(data.id, data.name, data.lastName,
                data.friends.map(friend => new FriendResponse(friend.id, friend.name, friend.lastName)),
                data.posts, data.friendRequests);
            this.relationToViewer = data.relation;
            break;
          default:
            this.userProfile = new UserProfilePublicResponse(data.id, data.name, data.lastName);
            break;
        }
      });
  }
}
