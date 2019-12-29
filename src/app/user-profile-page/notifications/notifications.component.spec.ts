// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
//
// import { NotificationsComponent } from './notifications.component';
// import {UserService} from '../../user.service';
// import FriendResponse from '../FriendResponse';
// import {of} from 'rxjs';
// import {RouterTestingModule} from '@angular/router/testing';
// import UserProfilePersonalResponse from '../UserProfilePersonalResponse';
// import {UserNotificationsService} from './user-notifications.service';
// import {UserNotificationsQuery} from './user-notifications.query';
//
// describe('NotificationsComponent', () => {
//   let component: NotificationsComponent;
//   let fixture: ComponentFixture<NotificationsComponent>;
//   let userService: jasmine.SpyObj<UserService>;
//   let userNotificationsService: jasmine.SpyObj<UserNotificationsService>;
//   let userNotificationsQuery: jasmine.SpyObj<UserNotificationsQuery>;
//   let elem: HTMLElement;
//
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ NotificationsComponent ],
//       providers: [ { provide: UserService, useValue: jasmine.createSpyObj('UserService', ['friendRequest']) },
//         { provide: UserNotificationsService, useValue: jasmine.createSpyObj('UserNotificationsService', ['fetchNotifications']) },
//         { provide: UserNotificationsQuery, useValue: jasmine.createSpyObj('UserNotificationsQuery', ['selectAll']) }],
//       imports: [ RouterTestingModule ]
//     })
//     .compileComponents();
//
//     userService = TestBed.get(UserService);
//     userNotificationsService = TestBed.get(UserNotificationsService);
//     userNotificationsQuery = TestBed.get(UserNotificationsQuery);
//   }));
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(NotificationsComponent);
//     component = fixture.componentInstance;
//     component.friendRequests = [];
//     elem = fixture.nativeElement;
//     fixture.detectChanges();
//
//     spyOn(userService, 'friendRequest').and.returnValue(of(null));
//     spyOn(userService, 'getUserProfile')
//       .and
//       .returnValue(of(new UserProfilePersonalResponse(1, '1', '1', [], [], [])));
//     spyOn(userNotificationsService, 'fetchNotifications').and.returnValue(undefined);
//     spyOn(userNotificationsQuery, 'selectAll').and.returnValue(of([new FriendResponse(1, '1', '1'), new FriendResponse(2, '2', '2')]));
//   });
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
//
//   it('should not show notifications body in the first place', () => {
//     const notificationsBodyElem: HTMLElement = elem.querySelector('.user-notifications__body');
//     expect(notificationsBodyElem.hidden).toBe(true);
//   });
//
//   it('should show notifications body after click at notifications header', () => {
//     const notificationsBodyElem: HTMLElement = elem.querySelector('.user-notifications__body');
//     const notificationsHeaderElem: HTMLElement = elem.querySelector('.user-notifications__header');
//     notificationsHeaderElem.dispatchEvent(new Event('click'));
//     fixture.detectChanges();
//     expect(notificationsBodyElem.hidden).toBe(false);
//   });
//
//   it('should create ul with li for each friend request', () => {
//     fixture.detectChanges();
//     const ulElem = elem.querySelector('.user-notifications-list');
//     expect(ulElem.getElementsByTagName('li').length).toEqual(2);
//   });
//
//   it('should call userService.friendRequest when clicked on ACCEPT button', () => {
//     fixture.detectChanges();
//     const ulElem = elem.querySelector('.user-notifications-list');
//     const acceptButton: HTMLButtonElement = ulElem
//       .querySelectorAll('li')[0]
//       .querySelectorAll('button')[0];
//
//     acceptButton.dispatchEvent(new Event('click'));
//     expect(userService.friendRequest).toHaveBeenCalledWith('ACCEPT', 1);
//   });
//
//   it('should call userService.friendRequest when clicked on DECLINE button', () => {
//     fixture.detectChanges();
//     const ulElem = elem.querySelector('.user-notifications-list');
//     const acceptButton: HTMLButtonElement = ulElem
//       .querySelectorAll('li')[1]
//       .querySelectorAll('button')[1];
//
//     acceptButton.dispatchEvent(new Event('click'));
//     expect(userService.friendRequest).toHaveBeenCalledWith('DECLINE', 2);
//   });
// });
