import {
  Component,
  ComponentFactoryResolver,
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import {SessionQuery} from './state/session/session.query';

@Directive({
  selector: '[appShowForRelationRoles]'
})
export class ShowForRelationRolesDirective implements OnInit {
  @Input() appShowForRelationRoles: string;
  @Input() appShowForRelationRolesIn: string[];
  @Input() appShowForRelationRolesShowMessage = false;
  @Input() appShowForRelationRolesElseMessage: string;

  constructor(private templateRef: TemplateRef<any>,
              private viewContainerRef: ViewContainerRef,
              private sessionQuery: SessionQuery,
              private asd: ComponentFactoryResolver) { }

  ngOnInit() {
    this.viewContainerRef.clear();
    this.sessionQuery.isLoggedIn$
      .subscribe(isLoggedIn => {
        if (isLoggedIn && this.appShowForRelationRolesIn.includes(this.appShowForRelationRoles)) {
          this.viewContainerRef.createEmbeddedView(this.templateRef);
        } else {
          if (this.appShowForRelationRolesShowMessage || this.appShowForRelationRolesElseMessage) {
            const componentFactory = this.asd.resolveComponentFactory(NoContentPlaceHolderComponent);
            if (this.appShowForRelationRolesElseMessage) {
              // TODO fix not showing custom message
              componentFactory.inputs.push({propName: 'message', templateName: this.appShowForRelationRolesElseMessage});
            }
            this.viewContainerRef.createComponent(componentFactory);
          }
        }
      });
  }

}

@Component(
  {
    selector: 'app-no-content-place-holder',
    template: `<div class="no-content-placeholder">{{message}}</div>`
  }
)
export class NoContentPlaceHolderComponent {
  @Input() message = 'You are not allowed to see this content';
}

