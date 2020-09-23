import {Component, OnInit} from '@angular/core';
import {NewsGroupInterface} from '../../interfaces/news-group-interface';
import {NewsgroupManagerService} from '../../services/newsgroup-manager.service';
import {ApiManagerService} from '../../services/api-manager.service';

@Component({
    selector: 'app-subscribe',
    templateUrl: './subscribe.page.html',
    styleUrls: ['./subscribe.page.scss'],
})
export class SubscribePage implements OnInit {
    public searchInput = '';
    public newsgroups: NewsGroupInterface[] = null;

    constructor(private ngManager: NewsgroupManagerService, private apiService: ApiManagerService) {
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
                        && lastNgs.filter(x => x.name === ng.name)[0].subscribed,
                    unread: lastNgs.filter(x => x.name === ng.name).length !== 0 ? lastNgs.filter(x => x.name === ng.name)[0].unread : []
                });
            });
        });
    }

    public saveNewsgroups() {
        console.log(this.newsgroups);
        this.ngManager.setNewsgroups(this.newsgroups);
    }

    public shouldShowNewsgroup(name: string): boolean {
        return name.toLowerCase().includes(this.searchInput.toLowerCase());
    }

}
