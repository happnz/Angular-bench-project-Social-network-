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
import { UserPreviewComponent } from './user-preview/user-preview.component';
import LoggedInGuard from './logged-in-guard';
import { FriendsComponent } from './friends/friends.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material';

const routes: Routes = [{path: '', pathMatch: 'full', redirectTo: '/sign-in'},
  {path: 'error', component: ErrorPageComponent},
  {path: 'sign-up', component: SignUpComponent, canActivate: [LoggedOutGuard]},
  {path: 'sign-in', component: SignInComponent, canActivate: [LoggedOutGuard]},
  {path: 'profile', redirectTo: 'profile/'},
  {path: 'profile/:id', component: UserProfilePageComponent},
  {path: 'news', component: NewsComponent, canActivate: [LoggedInGuard]},
  {path: 'search', component: SearchUsersComponent, canActivate: [LoggedInGuard]},
  {path: 'friends', redirectTo: 'friends/'},
  {path: 'friends/:id', component: FriendsComponent, canActivate: [LoggedInGuard]}];

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
    UserPreviewComponent,
    FriendsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
