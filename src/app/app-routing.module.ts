import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { MyGroupsComponent } from './pages/my-groups/my-groups.component';
import { MyprofileComponent } from './pages/myprofile/myprofile.component';
import { PagesComponent } from './pages/pages.component';

const routes: Routes = [
  { path : '', component: HomeComponent},
  { path : 'my-profile', component: MyprofileComponent},
  { path : 'my-groups', component: MyGroupsComponent},
  { path : '**', redirectTo: 'not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
