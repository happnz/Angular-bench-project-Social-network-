import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(public snackBar: MatSnackBar) { }

  showSuccess(message: string) {
    this.snackBar.open(message, 'X', {panelClass: 'alert-success', duration: 2000});
  }

  showError(message: string) {
    this.snackBar.open(message, 'X', {panelClass: 'alert-danger', duration: 3000});
  }
}
