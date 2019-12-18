import {EntityState, EntityStore, StoreConfig} from '@datorama/akita';
import FriendResponse from '../user-profile-page/FriendResponse';
import {Injectable} from '@angular/core';

export interface SearchUsersState extends EntityState<FriendResponse, number> {}

@StoreConfig({ name: 'searchUsers' })
@Injectable({ providedIn: 'root' })
export class SearchUsersStore extends EntityStore<SearchUsersState> {
  constructor() {
    super();
  }

}
