import {Component, OnDestroy, OnInit} from '@angular/core';
import UserProfilePublicResponse from './UserProfilePublicResponse';
import {UserService} from '../user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Relation} from './Relation';
import {catchError} from 'rxjs/operators';
import {Query, Store} from '@datorama/akita';

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.scss']
})
export class UserProfilePageComponent implements OnInit, OnDestroy {
  userProfile: any;
  relationToViewer: Relation;
  postInputToggled = false;
  relations = Relation;
  store: Store;
  query: Query<any>;

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    this.store = new Store<any>({}, {name: 'user-page'});
    this.query = new Query<any>(this.store);
    const userId = +this.route.snapshot.paramMap.get('id');
    this.fetchUserProfile(userId);
    this.route.params.subscribe(params => {
      const id = params.id;
      this.fetchUserProfile(id);
    });
  }

  ngOnDestroy() {
    this.store.destroy();
  }

  fetchUserProfile(userId: number) {
    this.store.setLoading(true);

    this.userService.getUserProfile(userId)
      .pipe(
        catchError((err => {
          this.store.setLoading(false);
          this.store.setError(err);
          return null;
        }))
      )
      .subscribe(data => {
        this.userProfile = data as UserProfilePublicResponse;
        this.relationToViewer = (data as any).relation as Relation;
        this.store.setLoading(false);
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
