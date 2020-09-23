import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingsSubscribePageRoutingModule } from './subscribe-routing.module';

import { SubscribePage } from './subscribe.page';
import {HomePageModule} from '../home/home.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SettingsSubscribePageRoutingModule,
    HomePageModule
  ],
  declarations: [SubscribePage]
})
export class SubscribePageModule {}
