import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchUsersComponent } from './search-users.component';
import {SearchUsersService} from './search-users.service';
import FriendResponse from '../user-profile-page/FriendResponse';
import {of} from 'rxjs';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {FormsModule} from '@angular/forms';

describe('SearchUsersComponent', () => {
  let component: SearchUsersComponent;
  let fixture: ComponentFixture<SearchUsersComponent>;
  let searchUsersService: SearchUsersService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchUsersComponent ],
      providers: [{ provide: SearchUsersService, useValue: new SearchUsersService(null) }],
      imports: [ FormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchUsersComponent);
    component = fixture.componentInstance;
    searchUsersService = TestBed.get(SearchUsersService);
    fixture.detectChanges();
  });

  it('should create', () => {
    const respData = [new FriendResponse(1, '1', '1'), new FriendResponse(2, '2', '2')];
    expect(component).toBeTruthy();
    spyOn(searchUsersService, 'fetchUsers').and.returnValue(of({
      currentPage: 1,
      perPage: 20,
      lastPage: 1,
      data: respData
    }));
    fixture.detectChanges();
    const ulElem: DebugElement = fixture.debugElement.query(By.css('#search-users-list'));
    expect(ulElem.children.length).toEqual(2);
  });
});
