import {Component, ElementRef, OnInit, ViewContainerRef} from '@angular/core';
import {User} from '../user';
import {SessionService} from '../session.service';
import {Observable} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {SessionQuery} from '../state/session/session.query';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  model: User;
  isLoading$: Observable<boolean>;
  error$: Observable<HttpErrorResponse>;

  constructor(
    private sessionService: SessionService,
    public sessionQuery: SessionQuery,
    public elementRef: ElementRef
  ) { }

  ngOnInit() {
    this.sessionService.clearState();
    this.model = new User('', '', '', '');
    this.isLoading$ = this.sessionQuery.selectLoading();
    this.error$ = this.sessionQuery.selectError();
  }

  onSubmit() {
    this.sessionService.signUp(this.model)
      .subscribe({
        error: err => {
          if (err.status === 400 && Array.isArray(err.error)) {
            const validationErrors: any[] = err.error;
            console.log(validationErrors);
            const componentElement: HTMLElement = this.elementRef.nativeElement as HTMLElement;
            for (let validationError of validationErrors) {
              validationError = validationError as any;
              const inputElem: HTMLInputElement =
                componentElement.querySelector(`input[name=${validationError.field}]`) as HTMLInputElement;
              inputElem.after(this.createErrorAlert(validationError.message));
            }
          }
        }
      });
  }

  createErrorAlert(text: string) {
    const divElem = document.createElement('div');
    divElem.classList.add('alert', 'alert-danger');
    divElem.innerText = text;
    return divElem;
  }
}
