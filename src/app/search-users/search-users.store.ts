import {EntityState, EntityStore, StoreConfig} from '@datorama/akita';
import {Injectable} from '@angular/core';
import FriendWithRelationResponse from '../user-profile-page/FriendWithRelationResponse';

export interface SearchUsersState extends EntityState<FriendWithRelationResponse, number> {}

@StoreConfig({ name: 'searchUsers' })
@Injectable({ providedIn: 'root' })
export class SearchUsersStore extends EntityStore<SearchUsersState> {
  constructor() {
    super();
  }

}
