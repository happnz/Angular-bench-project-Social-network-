import {Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {Subscription} from 'rxjs';
import {SessionQuery} from './state/session/session.query';

@Directive({
  selector: '[appShowIfLoggedIn]'
})
export class ShowIfLoggedInDirective implements OnInit, OnDestroy {
  subscription: Subscription;
  @Input() appShowIfLoggedIn: boolean;

  constructor(private templateRef: TemplateRef<any>,
              private viewContainerRef: ViewContainerRef,
              private sessionQuery: SessionQuery) {
  }

  ngOnInit() {
    this.subscription = this.sessionQuery.isLoggedIn$.subscribe(isLoggedIn => {
      this.viewContainerRef.clear();
      if (isLoggedIn) {
        if (this.appShowIfLoggedIn) {
          this.viewContainerRef.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainerRef.clear();
        }
      } else {
        if (this.appShowIfLoggedIn) {
          this.viewContainerRef.clear();
        } else {
          this.viewContainerRef.createEmbeddedView(this.templateRef);
        }
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
