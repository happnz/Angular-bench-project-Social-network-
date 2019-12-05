import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendHandlingButtonComponent } from './friend-handling-button.component';

describe('FriendHandlingButtonComponent', () => {
  let component: FriendHandlingButtonComponent;
  let fixture: ComponentFixture<FriendHandlingButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendHandlingButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendHandlingButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
