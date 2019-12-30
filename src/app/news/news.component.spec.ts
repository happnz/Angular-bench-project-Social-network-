import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsComponent } from './news.component';
import {UserService} from '../user.service';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {of} from 'rxjs';

describe('NewsComponent', () => {
  let component: NewsComponent;
  let fixture: ComponentFixture<NewsComponent>;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsComponent ],
      providers: [ { provide: UserService, useValue: {
        getNews: jest.fn().mockReturnValue(of([]))
      } }],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();

    userService = TestBed.get(UserService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call userService.getNews once after onInit', () => {
    component.ngOnInit();
    expect(userService.getNews).toHaveBeenCalledTimes(1);
  });
});
