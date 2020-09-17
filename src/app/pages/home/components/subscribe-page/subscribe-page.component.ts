import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Pages} from '../../home.page';
import {NewsgroupManagerService} from '../../../../services/newsgroup-manager.service';
import {ApiManagerService} from '../../../../services/api-manager.service';
import {NewsGroupInterface} from '../../interfaces/news-group-interface';

@Component({
    selector: 'app-subscribe-page',
    templateUrl: './subscribe-page.component.html',
    styleUrls: ['./subscribe-page.component.scss'],
})
export class SubscribePageComponent implements OnInit {
    @Output() changePage = new EventEmitter();
    PagesEnum = Pages;

    newsgroups: NewsGroupInterface[] = null;

    constructor(private ngManager: NewsgroupManagerService,
                private apiService: ApiManagerService) {
    }

    async ngOnInit() {
        const lastNgs = await this.ngManager.getNewsgroups();
        this.apiService.getGroups().subscribe(async (ngs: any[]) => {
            this.newsgroups = [];
            ngs.forEach(ng => {
                this.newsgroups.push({
                    name: ng.name,
                    first: ng.first,
                    last: ng.last,
                    count: ng.count,
                    subscribed: lastNgs.filter(x => x.name === ng.name).length !== 0
                        && lastNgs.filter(x => x.name === ng.name)[0].subscribed
                });
            });
        });
    }

    public saveNewsgroups() {
        console.log(this.newsgroups);
        this.ngManager.setNewsgroup(this.newsgroups);
    }

}
