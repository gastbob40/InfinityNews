import {Component, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';
import {NewsGroupInterface} from '../../interfaces/news-group-interface';
import {NavController} from '@ionic/angular';
import {ApiManagerService} from '../../services/api-manager.service';
import {NewsListInterface} from '../../interfaces/news-list-interface';

@Component({
    selector: 'app-news-list',
    templateUrl: './news-list.page.html',
    styleUrls: ['./news-list.page.scss'],
})
export class NewsListPage implements OnInit {
    public newsgroup: NewsGroupInterface = null;
    public news: NewsListInterface[] = null;
    public searchInput: string = '';

    constructor(private dataService: DataService, private navCtrl: NavController, private api: ApiManagerService) {
    }

    async ionViewWillEnter() {
        this.newsgroup = this.dataService.getData('newsgroup');
        if (this.newsgroup === undefined || this.newsgroup === null) {
            await this.navCtrl.navigateRoot('/');
        }
    }

    async ngOnInit() {
        if (this.newsgroup == null) {
            await this.ionViewWillEnter();
        }

        this.api.getNews(this.newsgroup.name).subscribe(async (data) => {
            this.news = data;
        });
    }

    async setNewsThread(newsThread: NewsListInterface) {
        this.dataService.setData('newsThread', newsThread);
        await this.navCtrl.navigateForward('/news-thread');
    }

    public shouldDisplay(news) {
        if (news.news.subject.toLowerCase().includes(this.searchInput.toLowerCase())) {
            return true;
        }

        for (const child of news.children) {
            if (this.shouldDisplay(child)) {
                return true;
            }
        }

        return false;
    }

    public shouldMarkUnread(news) {
        if (this.newsgroup.unread.includes(parseInt(news.news.number, 10))) {
            return true;
        }

        for (const child of news.children) {
            if (this.shouldMarkUnread(child)) {
                return true;
            }
        }

        return false;
    }
}
