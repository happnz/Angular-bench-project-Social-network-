import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {USERS_PAGINATOR} from '../search-users/users-paginator';
import {PaginationResponse, PaginatorPlugin} from '@datorama/akita';
import {SearchUsersState} from '../search-users/search-users.store';
import {SearchUsersService} from '../search-users/search-users.service';
import SearchUsersQuery from '../search-users/search-users.query';
import {ActivatedRoute} from '@angular/router';
import {startWith, switchMap, tap} from 'rxjs/operators';
import {combineLatest, Observable} from 'rxjs';
import FriendResponse from '../user-profile-page/FriendResponse';
import {FormControl} from '@angular/forms';
import {UserService} from '../user.service';
import UserProfilePublicResponse from '../user-profile-page/UserProfilePublicResponse';
import {plainToClass} from 'class-transformer';
import FriendWithRelationResponse from '../user-profile-page/FriendWithRelationResponse';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html'
})
export class FriendsComponent implements OnInit, OnDestroy {
  pagination$: Observable<PaginationResponse<FriendWithRelationResponse>>;
  name = new FormControl('');
  lastName = new FormControl('');
  userId: number;
  user: UserProfilePublicResponse;

  constructor(@Inject(USERS_PAGINATOR) public paginatorRef: PaginatorPlugin<SearchUsersState>,
              protected searchUsersService: SearchUsersService,
              public searchUsersQuery: SearchUsersQuery,
              private userService: UserService,
              protected activatedRoute: ActivatedRoute) {
    this.userId = parseInt(activatedRoute.snapshot.paramMap.get('id'), 10) || 0;
  }

  ngOnInit() {
    this.userService.getUserProfile(this.userId)
      .subscribe(response => this.user = plainToClass(UserProfilePublicResponse, response));

    const nameFilter = this.name.valueChanges.pipe(startWith(''));
    const lastNameFilter = this.lastName.valueChanges.pipe(startWith(''));

    this.pagination$ = combineLatest(
      this.paginatorRef.pageChanges,
      combineLatest(nameFilter, lastNameFilter)
        .pipe(
          tap((v) => {
            this.paginatorRef.clearCache();
            this.paginatorRef.setPage(1);
          })
        ))
      .pipe(
        switchMap(([page, [name, lastName]]) => {
          const req = () => this.searchUsersService.fetchFriends(this.userId, {
              pageSize: 10,
              pageNumber: page,
            },
            name, lastName);
          return this.paginatorRef.getPage(req);
        })
      );
  }

  ngOnDestroy() {
    this.paginatorRef.clearCache({ clearStore: true});
    this.paginatorRef.setLoading(true);
  }

}
