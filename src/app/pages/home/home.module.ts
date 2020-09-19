import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import {HomePageComponent} from './components/home-page/home-page.component';
import {SettingPageComponent} from './components/setting-page/setting-page.component';
import {SubscribePageComponent} from './components/subscribe-page/subscribe-page.component';
import {LoaderComponentComponent} from './components/loader-component/loader-component.component';
import {NewsgroupPageComponent} from './components/newsgroup-page/newsgroup-page.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
    declarations: [HomePage, HomePageComponent, SettingPageComponent, SubscribePageComponent, LoaderComponentComponent, NewsgroupPageComponent]
})
export class HomePageModule {}
