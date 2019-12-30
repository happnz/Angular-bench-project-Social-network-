import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsComponent } from './notifications.component';
import {UserService} from '../../user.service';
import FriendResponse from '../FriendResponse';
import {of} from 'rxjs';
import {RouterTestingModule} from '@angular/router/testing';
import UserProfilePersonalResponse from '../UserProfilePersonalResponse';
import {UserNotificationsService} from './user-notifications.service';
import {UserNotificationsQuery} from './user-notifications.query';

describe('NotificationsComponent', () => {
  let component: NotificationsComponent;
  let fixture: ComponentFixture<NotificationsComponent>;
  let userService;
  let userNotificationsService;
  let userNotificationsQuery;
  let elem: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationsComponent ],
      providers: [
        { provide: UserService, useValue: {
          friendRequest: jest.fn()
        }},
        { provide: UserNotificationsService, useValue: {
          fetchNotifications: jest.fn(),
          removeNotification: jest.fn()
        }},
        { provide: UserNotificationsQuery, useValue: {
          selectAll: jest.fn()
        }}],
      imports: [ RouterTestingModule ]
    })
    .compileComponents();

    userService = TestBed.get(UserService);
    userNotificationsService = TestBed.get(UserNotificationsService);
    userNotificationsQuery = TestBed.get(UserNotificationsQuery);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationsComponent);
    component = fixture.componentInstance;
    component.friendRequests = [];
    elem = fixture.nativeElement;

    userService.friendRequest.mockReturnValue(of(null));
    // userService.getUserProfile.mockReturnValue(of(new UserProfilePersonalResponse(1, '1', '1', [], [], [])));
    userNotificationsService.fetchNotifications.mockReturnValue(undefined);
    userNotificationsQuery.selectAll.mockReturnValue(of([new FriendResponse(1, '1', '1'), new FriendResponse(2, '2', '2')]));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not show notifications body in the first place', () => {
    const notificationsBodyElem: HTMLElement = elem.querySelector('.user-notifications__body');
    expect(notificationsBodyElem.hidden).toBe(true);
  });

  it('should show notifications body after click at notifications header', () => {
    const notificationsBodyElem: HTMLElement = elem.querySelector('.user-notifications__body');
    const notificationsHeaderElem: HTMLElement = elem.querySelector('.user-notifications__header');
    notificationsHeaderElem.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(notificationsBodyElem.hidden).toBe(false);
  });

  it('should create ul with li for each friend request', () => {
    fixture.detectChanges();
    const ulElem = elem.querySelector('.user-notifications-list');
    expect(ulElem.getElementsByTagName('li').length).toEqual(2);
  });

  it('should call userService.friendRequest when clicked on ACCEPT button', () => {
    fixture.detectChanges();
    const ulElem = elem.querySelector('.user-notifications-list');
    const acceptButton: HTMLButtonElement = ulElem
      .querySelectorAll('li')[0]
      .querySelectorAll('button')[0];

    acceptButton.dispatchEvent(new Event('click'));
    expect(userService.friendRequest).toHaveBeenCalledWith('ACCEPT', 1);
  });

  it('should call userService.friendRequest when clicked on DECLINE button', () => {
    fixture.detectChanges();
    const ulElem = elem.querySelector('.user-notifications-list');
    const declineButton: HTMLButtonElement = ulElem
      .querySelectorAll('li')[1]
      .querySelectorAll('button')[1];

    declineButton.dispatchEvent(new Event('click'));
    expect(userService.friendRequest).toHaveBeenCalledWith('DECLINE', 2);
  });
});
