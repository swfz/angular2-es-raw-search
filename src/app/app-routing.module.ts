import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {PageNotFoundComponent} from "./components/page-not-found.component";
import {TwitterApiComponent} from "./components/twitter-api/twitter-api.component";

const appRoutes: Routes = [
  { path: 'twitter-api', component: TwitterApiComponent },
//  { path: 'access-log', component: AccessLogComponent },
  { path: '', redirectTo: '/twitter-api', pathMatch: 'full'},
  { path: '**',  component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {}
