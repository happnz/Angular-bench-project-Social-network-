import {QueryEntity} from '@datorama/akita';
import {SearchUsersState, SearchUsersStore} from './search-users.store';
import {Injectable} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SearchUsersQuery extends QueryEntity<SearchUsersState> {

  constructor(protected store: SearchUsersStore) {
    super(store);
  }

}
