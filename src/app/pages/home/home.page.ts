import {Component, OnInit} from '@angular/core';
import {NavController, PopoverController} from '@ionic/angular';
import {ThemeManagerService} from '../../services/theme-manager.service';
import {NewsgroupManagerService} from '../../services/newsgroup-manager.service';
import {ApiManagerService} from '../../services/api-manager.service';
import {DataService} from '../../services/data.service';
import {NewsGroupInterface} from '../../interfaces/news-group-interface';
import {PopoverComponent} from './popover/settings-popover/popover.component';

export enum Pages {
    HomePage,
    SettingsPage,
    SubscribePage,
    NewsGroupPage,
    NewsGroupThreadPage,
}

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
    pages = Pages;
    selectedPage = Pages.HomePage;
    newsgroups;

    constructor(public theme: ThemeManagerService, private ngManager: NewsgroupManagerService, private popoverController: PopoverController,
                private apiService: ApiManagerService, private dataService: DataService, public navCtrl: NavController) {
        this.theme.loadDarkMode();
    }

    async ionViewWillEnter() {
        // First step, get the newsgroup we need to show
        const newsgroups = await this.ngManager.getNewsgroups();
        this.newsgroups = newsgroups.filter(ng => ng.subscribed);

    }

    async ngOnInit() {
        // We need to get staff from data base
        this.apiService.getStaffs().subscribe(async (data) => {
            const staffs = {};
            for (const d of data) {
                staffs[d.email] = {
                    color: d.color,
                    slug: d.slug
                };
            }
            this.dataService.setData('staffs', staffs);
        });
    }

    async setNewsGroup(newsgroup: NewsGroupInterface) {
        this.dataService.setData('newsgroup', newsgroup);
        await this.navCtrl.navigateForward('/news-list');
    }

    async presentPopover(ev: any) {
        const popover = await this.popoverController.create({
            component: PopoverComponent,
            event: ev,
            translucent: true
        });

        await popover.present();

        return popover.onDidDismiss().then(
            (data: any) => {
                if (data) {
                    if (data.data === 'refresh') {

                    } else {
                        this.navCtrl.navigateForward('/' + data.data);
                    }
                    if (data.data === 'settings') {
                    }

                    if (data.data === 'subscribe') {
                    }
                }
            }
        );
    }
}
