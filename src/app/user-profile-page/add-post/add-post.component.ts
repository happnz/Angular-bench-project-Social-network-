import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {UserService} from '../../user.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html'
})
export class AddPostComponent {
  maxLength = 2048;
  charactersLeft = this.maxLength;

  nameControl = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(this.maxLength)
  ]);
  @Output() postAdded = new EventEmitter();

  constructor(private userService: UserService) {
  }

  submitPost() {
    if (!this.nameControl.value.trim()) {
      return;
    }

    this.userService.addPost(this.nameControl.value)
      .subscribe(_ => this.postAdded.emit());
  }

  checkLength() {
    const typedLength = this.nameControl.value.length;
    this.charactersLeft = this.maxLength - typedLength;
  }
}
