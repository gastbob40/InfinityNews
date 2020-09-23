import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutPage } from './about.page';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';

const routes: Routes = [
  {
    path: '',
    component: AboutPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    InAppBrowser
  ],
})
export class AboutPageRoutingModule {}
