import {Store, StoreConfig} from '@datorama/akita';
import {SessionState, createInitialState} from './session.state';
import {Injectable} from '@angular/core';

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'session' })
export class SessionStore extends Store<SessionState> {
  constructor() {
    super(createInitialState());
  }
}
