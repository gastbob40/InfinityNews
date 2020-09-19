import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Pages} from '../../home.page';
import {NewsGroupInterface} from '../../../../interfaces/news-group-interface';
import {NewsgroupManagerService} from '../../../../services/newsgroup-manager.service';
import {ApiManagerService} from '../../../../services/api-manager.service';

@Component({
    selector: 'app-newsgroup-thread-page',
    templateUrl: './newsgroup-thread-page.component.html',
    styleUrls: ['./newsgroup-thread-page.component.scss'],
})
export class NewsgroupThreadPageComponent implements OnInit {
    @Output() changePage = new EventEmitter();
    PagesEnum = Pages;
    news = null;

    constructor(private ngManager: NewsgroupManagerService, private api: ApiManagerService) {
    }

    async ngOnInit() {
        this.news = await this.ngManager.getSelectedNews();
    }

}
