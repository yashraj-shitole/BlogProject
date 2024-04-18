import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { ViewAllComponent } from './pages/view-all/view-all.component';
import { ViewPostComponent } from './pages/view-post/view-post.component';
import { SearchComponent } from './pages/search/search.component';
import { PopularComponent } from './pages/popular/popular.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RouteGuardService } from './service/route-guard.service';
import { MyPostComponent } from './pages/my-post/my-post.component';
import { UpdateComponent } from './pages/update/update.component';

const routes: Routes = [
  {path:"create-post", component:CreatePostComponent,canActivate:[RouteGuardService]},
  {path:"", component:ViewAllComponent,canActivate:[RouteGuardService]},
  {path:"search",component:SearchComponent,canActivate:[RouteGuardService]},
  {path:"view-post/:id", component: ViewPostComponent, canActivate:[RouteGuardService]},
  {path:"popular", component: PopularComponent, canActivate:[RouteGuardService]},
  {path:"my-posts", component: MyPostComponent, canActivate:[RouteGuardService]},
  {path:"update", component: UpdateComponent, canActivate:[RouteGuardService]},
  {path:"login", component:LoginComponent},
  {path:"register", component:RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
