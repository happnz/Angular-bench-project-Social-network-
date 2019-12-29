import {inject, InjectionToken} from '@angular/core';
import {SearchUsersQuery} from './search-users.query';
import {PaginatorPlugin} from '@datorama/akita';

export const USERS_PAGINATOR = new InjectionToken('USERS_PAGINATOR', {
  providedIn: 'root',
  factory: () => {
    const searchUsersQuery = inject(SearchUsersQuery);
    return new PaginatorPlugin(searchUsersQuery)
      .withRange()
      .withControls();
  }
});
