import {EntityState, EntityStore, StoreConfig} from '@datorama/akita';
import {Injectable} from '@angular/core';
import FriendResponse from '../FriendResponse';

export interface UserNotificationsState extends EntityState<FriendResponse, number> {}

@StoreConfig({ name: 'notifications' })
@Injectable({ providedIn: 'root' })
export class UserNotificationsStore extends EntityStore<UserNotificationsState> {
  constructor() {
    super();
  }

}
