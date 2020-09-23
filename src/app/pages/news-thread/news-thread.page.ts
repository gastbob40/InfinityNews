import {Component, OnInit} from '@angular/core';
import {NewsGroupInterface} from '../../interfaces/news-group-interface';
import {NewsListInterface} from '../../interfaces/news-list-interface';
import {DataService} from '../../services/data.service';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-news-thread',
    templateUrl: './news-thread.page.html',
    styleUrls: ['./news-thread.page.scss'],
})
export class NewsThreadPage implements OnInit {
    public staffs: any;
    public newsgroup: NewsGroupInterface = null;
    public newsThread: NewsListInterface[] = null;

    constructor(private dataService: DataService, private navCtrl: NavController) {
    }

    async ngOnInit() {
        this.newsgroup = this.dataService.getData('newsgroup');
        this.newsThread = this.dataService.getData('newsThread');

        if (this.newsgroup === undefined || this.newsThread === null) {
            await this.navCtrl.navigateRoot('/');
        }
    }

}
