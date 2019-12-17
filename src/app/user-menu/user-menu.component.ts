import {Component, OnDestroy, OnInit} from '@angular/core';
import {SessionService} from '../session.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit, OnDestroy {
  private additionalOffset = 50;
  scrolledDown = false;
  componentScrollHandler = this.scrollHandler.bind(this);

  constructor(private sessionService: SessionService) {
  }

  ngOnInit() {
    window.addEventListener('scroll', this.componentScrollHandler);
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.componentScrollHandler);
  }

  private scrollHandler() {
    const menuElem: HTMLElement = document.querySelector('.user-menu-holder');

    this.scrolledDown = window.pageYOffset > menuElem.offsetTop + menuElem.offsetHeight + this.additionalOffset;
  }

  signOut() {
    this.sessionService.signOut();
  }
}
