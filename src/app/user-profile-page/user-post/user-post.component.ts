import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserService} from '../../user.service';

@Component({
  selector: 'app-user-post',
  templateUrl: './user-post.component.html',
  styleUrls: ['./user-post.component.scss']
})
export class UserPostComponent implements OnInit {
  @Input() isPersonal: boolean;
  @Input() id: number;
  @Input() authorId: number;
  @Input() authorFullName: string;
  @Input() authorAvatarSrc?: string;
  @Input() createdAt: Date;
  @Input() text: string;
  @Input() updatedAt?: Date;

  @Output() postDeleted = new EventEmitter();

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  deletePost(id: number) {
    if (confirm('Are you sure?')) {
      this.userService.deletePost(id)
        .subscribe(_ => this.postDeleted.emit());
    }
  }
}
