import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewsThreadPageRoutingModule } from './news-thread-routing.module';

import { NewsThreadPage } from './news-thread.page';
import {HomePageModule} from '../home/home.module';
import {NewsgroupThreadItemComponent} from './components/newsgroup-thread-item/newsgroup-thread-item.component';
import {NewsModalComponent} from './modals/news-modal/news-modal.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        NewsThreadPageRoutingModule,
        HomePageModule
    ],
    declarations: [NewsThreadPage, NewsgroupThreadItemComponent, NewsModalComponent],
    entryComponents: [NewsModalComponent]
})
export class NewsThreadPageModule {}
