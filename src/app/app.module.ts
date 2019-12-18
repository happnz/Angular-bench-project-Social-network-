import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import {InterceptorService} from './interceptor.service';
import { UserProfilePageComponent } from './user-profile-page/user-profile-page.component';
import { FriendHandlingButtonComponent } from './user-profile-page/friend-handling-button/friend-handling-button.component';
import { UserPostComponent } from './user-profile-page/user-post/user-post.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { LoadingComponent } from './loading/loading.component';
import { AddPostComponent } from './user-profile-page/add-post/add-post.component';
import { CustomDatePipe } from './custom-date.pipe';
import { NotificationsComponent } from './user-profile-page/notifications/notifications.component';
import { NewsComponent } from './news/news.component';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { FormStatusComponent } from './form-status/form-status.component';
import { ShowIfLoggedInDirective } from './show-if-logged-in.directive';
import LoggedOutGuard from './logged-out-guard';
import { SearchUsersComponent } from './search-users/search-users.component';
import {USERS_PAGINATOR} from './search-users/users-paginator';
import { UserPreviewComponent } from './user-preview/user-preview.component';

const routes: Routes = [{path: '', pathMatch: 'full', redirectTo: '/sign-in'},
  {path: 'error', component: ErrorPageComponent},
  {path: 'sign-up', component: SignUpComponent, canActivate: [LoggedOutGuard]},
  {path: 'sign-in', component: SignInComponent, canActivate: [LoggedOutGuard]},
  {path: 'profile', redirectTo: 'profile/'},
  {path: 'profile/:id', component: UserProfilePageComponent},
  {path: 'news', component: NewsComponent},
  {path: 'search', component: SearchUsersComponent}];

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    UserProfilePageComponent,
    FriendHandlingButtonComponent,
    UserPostComponent,
    ErrorPageComponent,
    LoadingComponent,
    AddPostComponent,
    CustomDatePipe,
    NotificationsComponent,
    NewsComponent,
    UserMenuComponent,
    FormStatusComponent,
    ShowIfLoggedInDirective,
    SearchUsersComponent,
    UserPreviewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
