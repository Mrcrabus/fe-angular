import {isDevMode, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {PostComponent} from './components/post/post.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {GlobalErrorComponent} from './components/global-error/global-error.component';
import {FilterPostsPipe} from './pipes/filter-posts.pipe';
import {CreatePostComponent} from './components/create-post/create-post.component';
import {FocusDirective} from './directives/focus.directive';
import {PostsPageComponent} from './pages/posts-page/posts-page.component';
import {AboutPageComponent} from './pages/about-page/about-page.component';
import {RouterOutlet} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import {NavigationComponent} from './components/navigation/navigation.component';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';
import {StoreRouterConnectingModule} from '@ngrx/router-store';
import {ModalComponent} from './components/modal/modal.component';
import {LoginComponent} from './components/login/login.component';
import {AuthInterceptor} from './services/auth-interceptor.service';
import {reducers} from './store';
import {SignupComponent} from './components/signup/signup.component';
import {NgOptimizedImage} from '@angular/common';
import {PostPageComponent} from './pages/post-page/post-page.component';
import {NotFoundPageComponent} from './pages/not-found-page/not-found-page.component';
import {UserPageComponent} from './pages/user-page/user-page.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ConfirmComponent } from './components/confirm/confirm.component';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule, ReactiveFormsModule, RouterOutlet, AppRoutingModule, StoreModule.forRoot(reducers), StoreDevtoolsModule.instrument({
    maxAge: 25,
    logOnly: !isDevMode()
  }), EffectsModule.forRoot([]), StoreRouterConnectingModule.forRoot(), NgOptimizedImage],
  declarations: [
    AppComponent,
    PostComponent,
    GlobalErrorComponent,
    FilterPostsPipe,
    CreatePostComponent,
    FocusDirective,
    PostsPageComponent,
    AboutPageComponent,
    NavigationComponent,
    ModalComponent,
    LoginComponent,
    SignupComponent,
    PostPageComponent,
    NotFoundPageComponent,
    UserPageComponent,
    LoadingComponent,
    ConfirmComponent,

  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ]
})
export class AppModule {
}
