import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {USERS_PAGINATOR} from './users-paginator';
import {PaginationResponse, PaginatorPlugin} from '@datorama/akita';
import {SearchUsersState} from './search-users.store';
import {SearchUsersService} from './search-users.service';
import {Observable} from 'rxjs';
import {startWith, switchMap} from 'rxjs/operators';
import FriendResponse from '../user-profile-page/FriendResponse';

@Component({
  selector: 'app-search-users',
  templateUrl: './search-users.component.html',
  styleUrls: ['./search-users.component.scss']
})
export class SearchUsersComponent implements OnInit, OnDestroy {
  pagination$: Observable<PaginationResponse<FriendResponse>>;
  name = '';
  lastName = '';

  constructor(@Inject(USERS_PAGINATOR) public paginatorRef: PaginatorPlugin<SearchUsersState>,
              private searchUsersService: SearchUsersService) {}

  ngOnInit() {

    this.pagination$ = this.paginatorRef.pageChanges.pipe(
      switchMap((page) => {
        const req = () => this.searchUsersService.fetchUsers({
          pageSize: 2,
          pageNumber: page,
        },
          this.name, this.lastName);
        return this.paginatorRef.getPage(req);
      })
    );
  }

  ngOnDestroy() {
    this.paginatorRef.destroy();
  }

}
