import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import PaginationQuery from '../shared/PaginationQuery';
import PostWithAuthorResponse from '../user-profile-page/PostWithAuthorResponse';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html'
})
export class NewsComponent implements OnInit, OnDestroy {
  private paginationQuery: PaginationQuery = {
    pageNumber: 1,
    pageSize: 10
  };

  private posts: PostWithAuthorResponse[] = [];
  private allLoaded = false;
  private isLoading = false;
  private listener = null;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.fetchNews();
    this.listener = this.handleScroll.bind(this);
    window.addEventListener('scroll', this.listener);
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.listener);
  }

  handleScroll() {
    const ulElem = document.getElementById('newsFeedList');

    if (isScrolledPastUl()) {
      this.fetchNews();
    }

    function isScrolledPastUl() {
      return (window.pageYOffset + document.documentElement.clientHeight) > (ulElem.offsetTop + ulElem.clientHeight);
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
          this.isLoading = false;
        });
    }
  }

}
