import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PostsPageComponent} from './pages/posts-page/posts-page.component';
import {AboutPageComponent} from './pages/about-page/about-page.component';
import {NotFoundPageComponent} from './pages/not-found-page/not-found-page.component';
import {PostPageComponent} from './pages/post-page/post-page.component';
import {UserPageComponent} from './pages/user-page/user-page.component';

const routes: Routes = [
  {path: '', component: PostsPageComponent},
  {path: 'about', component: AboutPageComponent},
  {path: 'posts/:id', component: PostPageComponent},
  {path: ':id', component: UserPageComponent},
  {path: 'error/not-found', component: NotFoundPageComponent},
  {path: '**', component: NotFoundPageComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]

})
export class AppRoutingModule {
}
