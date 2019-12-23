import { Injectable } from '@angular/core';
import {NotificationService} from '../notification.service';
import {SessionService} from '../session.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private notificationService: NotificationService,
              private sessionService: SessionService,
              private router: Router) { }

  handleHttpError(err) {
    if (err.status === 401) {
      this.sessionService.clearState();
      this.notificationService.showError('Error: ' + err.error);
      this.router.navigate(['/sign-in']);
    } else if (err.status >= 500) {
      this.notificationService.showError('Unexpected server error');
    } else if (err.status === 404) {
      this.notificationService.showError(err.status + ' ' + err.statusText);
    } else if (err.status >= 400) {
      this.notificationService.showError('Error: ' + err.error);
    }
  }
}
