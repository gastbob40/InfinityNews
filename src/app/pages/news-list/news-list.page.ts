import {Component, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';
import {NewsGroupInterface} from '../../interfaces/news-group-interface';
import {NavController, ToastController} from '@ionic/angular';
import {ApiManagerService} from '../../services/api-manager.service';
import {NewsListInterface} from '../../interfaces/news-list-interface';
import {NewsgroupManagerService} from '../../services/newsgroup-manager.service';

@Component({
    selector: 'app-news-list',
    templateUrl: './news-list.page.html',
    styleUrls: ['./news-list.page.scss'],
})
export class NewsListPage implements OnInit {
    public newsgroup: NewsGroupInterface = null;
    public news: NewsListInterface[] = null;
    public searchInput: string = '';
    public onlyUnread: boolean = false;

    constructor(private dataService: DataService, private navCtrl: NavController, private api: ApiManagerService,
                private ngManager: NewsgroupManagerService, private toastController: ToastController) {
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

    /**
     * This function change the value of the onlyUnread variable.
     * @param state The new value
     */
    public setOnlyUnread(state: boolean) {
        this.onlyUnread = state;
    }

    /**
     * This function is used to test if we need to display the news.
     * If only_read is set to true, the news must be unread
     * @param news The news
     */
    public shouldDisplay(news) {
        if (news.news.subject.toLowerCase().includes(this.searchInput.toLowerCase()) &&
            (this.onlyUnread === false || this.newsgroup.unread.includes(parseInt(news.news.number, 10)))) {
            return true;
        }

        for (const child of news.children) {
            if (this.shouldDisplay(child)) {
                return true;
            }
        }

        return false;
    }

    /**
     * This function is used to guess if we need to mark this news as unread.
     * @param news The news
     */
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

    /**
     * This function is used to set all news of this newsgroups as unread
     */
    async markAllUnread() {
        const newsgroups = await this.ngManager.getNewsgroups();
        for (let i = 0; i < newsgroups.length; i++) {
            if (newsgroups[i].name === this.newsgroup.name) {
                newsgroups[i].unread = [];
                this.newsgroup = newsgroups[i];
            }
        }

        await this.ngManager.setNewsgroups(newsgroups);

        const toast = await this.toastController.create({
            message: `You just marked all news as read.`,
            duration: 2000,
        });
        await toast.present();
    }
}
