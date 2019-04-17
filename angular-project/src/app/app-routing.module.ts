import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PostDetailsComponent } from './components/posts/post-details/post-details.component';
import { PostCreateComponent } from './components/posts/post-create/post-create.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { LoginComponent } from './components/auth/login/login.component';
import { PostEditComponent } from './components/posts/post-edit/post-edit.component';
import { PostAllComponent } from './components/posts/post-all/post-all.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'posts', component: PostAllComponent },
  { path: 'posts/details/:id', component: PostDetailsComponent},
  { path: 'posts/edit/:id', component: PostEditComponent },
  { path: 'posts/create', component: PostCreateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
