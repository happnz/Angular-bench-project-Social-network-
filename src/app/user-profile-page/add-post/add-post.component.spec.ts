import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPostComponent } from './add-post.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserService} from '../../user.service';
import {Observable, of} from 'rxjs';

describe('AddPostComponent', () => {
  let component: AddPostComponent;
  let fixture: ComponentFixture<AddPostComponent>;
  let userService: UserService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPostComponent ],
      providers: [{ provide: UserService, useValue: new UserService(null)}],
      imports: [FormsModule, ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    userService = TestBed.get(UserService);
    spyOn(userService, 'addPost').and.returnValue(of({}));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show correct value of "characters left"', () => {
    const elem: Element = fixture.nativeElement;
    const textareaElem: HTMLTextAreaElement = elem.querySelector('textarea');
    expect(textareaElem).toBeDefined();

    const text = 'sometext';
    textareaElem.value = text;
    textareaElem.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.charactersLeft).toEqual(component.maxLength - text.length);
  });

  it('should disable button when textarea is empty', () => {
    const elem: Element = fixture.nativeElement;
    const textareaElem: HTMLTextAreaElement = elem.querySelector('textarea');
    expect(textareaElem).toBeDefined();

    const text = '';
    textareaElem.value = text;
    textareaElem.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const button: HTMLButtonElement = elem.querySelector('button');
    expect(button.disabled).toBe(true);
  });

  it('should enable button when textarea is not empty', () => {
    const elem: Element = fixture.nativeElement;
    const textareaElem: HTMLTextAreaElement = elem.querySelector('textarea');
    expect(textareaElem).toBeDefined();

    const text = 'Hi';
    textareaElem.value = text;
    textareaElem.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const button: HTMLButtonElement = elem.querySelector('button');
    expect(button.disabled).toBe(false);
  });
});
