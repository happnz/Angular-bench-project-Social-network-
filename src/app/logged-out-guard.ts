import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {SessionQuery} from './state/session/session.query';
import {take} from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class LoggedOutGuard implements CanActivate {

  constructor(private router: Router,
              private sessionQuery: SessionQuery) {
  }

  async canActivate(route: ActivatedRouteSnapshot,
                    state: RouterStateSnapshot): Promise<boolean> {
    return this.sessionQuery.isLoggedIn$.pipe(take(1)).toPromise().then(isLoggedIn => {
      if (!isLoggedIn) {
        return true;
      } else {
        this.router.navigateByUrl('/profile');
        return false;
      }
    });
  }
}
