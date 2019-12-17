import {SessionStore} from './session.store';
import {Query} from '@datorama/akita';
import {SessionState} from './session.state';
import {Injectable} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SessionQuery extends Query<SessionState> {
  isLoggedIn$ = this.select(state => state.id !== -1);
  selectId$ = this.select('id');
  selectName$ = this.select('name');

  constructor(protected store: SessionStore) {
    super(store);
  }
}
