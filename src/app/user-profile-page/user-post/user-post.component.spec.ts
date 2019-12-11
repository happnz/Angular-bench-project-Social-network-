import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPostComponent } from './user-post.component';
import {UserService} from '../../user.service';
import {CustomDatePipe} from '../../custom-date.pipe';
import {of} from 'rxjs';
import {RouterTestingModule} from '@angular/router/testing';

describe('UserPostComponent', () => {
  let component: UserPostComponent;
  let fixture: ComponentFixture<UserPostComponent>;
  let userService: UserService;

  function initComponentInputs(userPostComponent: UserPostComponent) {
    userPostComponent.isPersonal = true;
    userPostComponent.id = 1;
    userPostComponent.authorFullName = '1';
    userPostComponent.authorAvatarSrc = '1';
    userPostComponent.createdAt = new Date();
    userPostComponent.text = 'Hi';
    userPostComponent.updatedAt = null;
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPostComponent, CustomDatePipe ],
      providers: [{ provide: UserService, useValue: new UserService(null)}, CustomDatePipe ],
      imports: [ RouterTestingModule ]
    })
    .compileComponents();

    userService = TestBed.get(UserService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPostComponent);
    component = fixture.componentInstance;
    initComponentInputs(component);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not show delete icon if isPersonal is false', () => {
    spyOn(userService, 'deletePost').and.returnValue(of(null));
    component.isPersonal = false;
    fixture.detectChanges();
    const elem: HTMLElement = fixture.nativeElement;
    const iconElem: HTMLElement = elem.querySelector('.user-post__date + i');
    expect(iconElem).toBeFalsy();
  });

  it('should call userService.deletePost when clicked on delete icon', () => {
    spyOn(userService, 'deletePost').and.returnValue(of(null));
    spyOn(window, 'confirm').and.returnValue(true);
    component.isPersonal = true;
    component.id = 1;
    fixture.detectChanges();
    const elem: HTMLElement = fixture.nativeElement;
    const iconElem: HTMLElement = elem.querySelector('.user-post__date + i');
    iconElem.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(userService.deletePost).toHaveBeenCalledWith(1);
  });
});
