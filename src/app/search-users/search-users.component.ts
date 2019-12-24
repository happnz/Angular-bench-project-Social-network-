import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {USERS_PAGINATOR} from './users-paginator';
import {PaginationResponse, PaginatorPlugin} from '@datorama/akita';
import {SearchUsersState} from './search-users.store';
import {SearchUsersService} from './search-users.service';
import {combineLatest, Observable} from 'rxjs';
import {startWith, switchMap, tap} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import SearchUsersQuery from './search-users.query';
import FriendWithRelationResponse from '../user-profile-page/FriendWithRelationResponse';

@Component({
  selector: 'app-search-users',
  templateUrl: './search-users.component.html',
  styleUrls: ['./search-users.component.scss']
})
export class SearchUsersComponent implements OnInit, OnDestroy {
  pagination$: Observable<PaginationResponse<FriendWithRelationResponse>>;
  name = new FormControl('');
  lastName = new FormControl('');

  constructor(@Inject(USERS_PAGINATOR) public paginatorRef: PaginatorPlugin<SearchUsersState>,
              public searchUsersService: SearchUsersService,
              public searchUsersQuery: SearchUsersQuery) {}

  ngOnInit() {
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
          const req = () => this.searchUsersService.fetchUsers({
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
