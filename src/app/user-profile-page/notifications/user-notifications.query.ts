import {QueryEntity} from '@datorama/akita';
import {UserNotificationsState, UserNotificationsStore} from './user-notifications.store';
import {Injectable} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserNotificationsQuery extends QueryEntity<UserNotificationsState> {

  constructor(protected store: UserNotificationsStore) {
    super(store);
  }

}
