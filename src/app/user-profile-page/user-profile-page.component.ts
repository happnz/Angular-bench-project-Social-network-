import {Component, OnInit} from '@angular/core';
import UserProfilePublicResponse from './UserProfilePublicResponse';
import {UserService} from '../user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Relation} from './Relation';
import UserProfileForUsersResponse from './UserProfileForUsersResponse';
import UserProfileForFriendsResponse from './UserProfileForFriendsResponse';
import UserProfilePersonalResponse from './UserProfilePersonalResponse';
import FriendResponse from './FriendResponse';
import {catchError} from 'rxjs/operators';
import LoadingStatus from '../shared/LoadingStatus';

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.scss']
})
export class UserProfilePageComponent implements OnInit {
  loadingStatus = new LoadingStatus();
  userProfile: UserProfilePublicResponse | UserProfileForUsersResponse | UserProfileForFriendsResponse | UserProfilePersonalResponse;
  relationToViewer: Relation;
  postInputToggled = false;

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
      this.fetchUserProfile(id);
    });
  }

  fetchUserProfile(userId: number) {
    this.loadingStatus.startLoading();

    this.userService.getUserProfile(userId)
      .pipe(
        catchError((err => {
          this.loadingStatus.finishLoading(err);
          return null;
        }))
      )
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
                data.posts,
                data.friendRequests.map(friend => new FriendResponse(friend.id, friend.name, friend.lastName)));
            this.relationToViewer = data.relation;
            break;
          default:
            this.userProfile = new UserProfilePublicResponse(data.id, data.name, data.lastName);
            break;
        }
        this.loadingStatus.finishLoading();
      });
  }

  togglePostInput() {
    this.postInputToggled = !this.postInputToggled;
  }

  handlePostAdded() {
    this.postInputToggled = false;
    this.fetchUserProfile(0);
    //  TODO fetch posts only instead of the whole profile
  }

  handlePostDeleted() {
    this.fetchUserProfile(0);
    //  TODO fetch posts only instead of the whole profile
  }
}
