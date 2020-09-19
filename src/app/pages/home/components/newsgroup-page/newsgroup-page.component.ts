import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NewsGroupInterface} from '../../../../interfaces/news-group-interface';
import {Pages} from '../../home.page';
import {NewsgroupManagerService} from '../../../../services/newsgroup-manager.service';
import {ApiManagerService} from '../../../../services/api-manager.service';

@Component({
    selector: 'app-newsgroup-page',
    templateUrl: './newsgroup-page.component.html',
    styleUrls: ['./newsgroup-page.component.scss'],
})
export class NewsgroupPageComponent implements OnInit {
    @Output() changePage = new EventEmitter();
    PagesEnum = Pages;
    newsgroup: NewsGroupInterface = null;
    news = null;

    constructor(private ngManager: NewsgroupManagerService, private api: ApiManagerService) {
    }

    async ngOnInit() {
        this.newsgroup = await this.ngManager.getSelectedNewsgroup();
        this.api.getNews(this.newsgroup.name).subscribe(async (data) => {
            this.news = data.news;
        });
    }

}
