import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import PaginationQuery from '../shared/PaginationQuery';
import PostWithAuthorResponse from '../user-profile-page/PostWithAuthorResponse';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  private paginationQuery: PaginationQuery = {
    pageNumber: 1,
    pageSize: 10
  };

  private posts: PostWithAuthorResponse[] = [];
  private allLoaded = false;
  private isLoading: boolean;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.fetchNews();
    window.addEventListener('scroll', this.handleScroll.bind(this));
  }

  handleScroll() {
    const ulElem = document.getElementById('newsFeedList');

    if ((window.pageYOffset + document.documentElement.clientHeight) > (ulElem.offsetTop + ulElem.clientHeight)) {
      this.fetchNews();
    }
  }

  fetchNews() {
    if (!this.allLoaded && !this.isLoading) {
      this.isLoading = true;
      this.userService.getNews(this.paginationQuery)
        .subscribe(posts => {
          this.paginationQuery.pageNumber++;
          this.posts = this.posts.concat(posts);
          if (posts.length < this.paginationQuery.pageSize) {
            this.allLoaded = true;
          }
        });
      this.isLoading = false;
    }
  }

}
