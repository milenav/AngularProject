import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PostDetailsComponent } from './components/posts/post-details/post-details.component';
import { PostCreateComponent } from './components/posts/post-create/post-create.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { LoginComponent } from './components/auth/login/login.component';
import { PostAllComponent } from './components/posts/post-all/post-all.component';
import { AuthGuard } from './core/guards/auth.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'posts', component: PostAllComponent, canActivate: [ AuthGuard ] },
  { path: 'posts/details/:id', component: PostDetailsComponent, canActivate: [ AuthGuard ]  },
  { path: 'posts/create', component: PostCreateComponent, canActivate: [ AuthGuard ]  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
