import {Component, OnInit} from '@angular/core';
import {LoadingController, NavController, PopoverController} from '@ionic/angular';
import {ThemeManagerService} from '../../services/theme-manager.service';
import {NewsgroupManagerService} from '../../services/newsgroup-manager.service';
import {ApiManagerService} from '../../services/api-manager.service';
import {DataService} from '../../services/data.service';
import {NewsGroupInterface} from '../../interfaces/news-group-interface';
import {PopoverComponent} from './popover/settings-popover/popover.component';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
    newsgroups: NewsGroupInterface[];

    constructor(public theme: ThemeManagerService, private ngManager: NewsgroupManagerService, private popoverController: PopoverController,
                private apiService: ApiManagerService, private dataService: DataService, public navCtrl: NavController,
                private loadingController: LoadingController) {
        this.theme.loadDarkMode();
    }

    async ionViewWillEnter() {
        const newsgroups = await this.ngManager.getNewsgroups();
        await this.updateNewsgroups();
        this.newsgroups = newsgroups.filter(ng => ng.subscribed);
    }

    async ngOnInit() {
        // We need to get staff from data base
        /*let nw = await this.ngManager.getNewsgroups();
        for (let i = 0; i < nw.length; i++) {
            if (nw[i].name === 'cri.news') {
                nw[i].last = 90;
            }
        }
        this.ngManager.setNewsgroups(nw);*/
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

    async updateNewsgroups() {
        this.apiService.getGroups().subscribe(async (newNewsgroups: NewsGroupInterface[]) => {
            let newsgroups = await this.ngManager.getNewsgroups();
            for (let i = 0; i < newsgroups.length; i++) {
                const newNewsgroup = newNewsgroups.filter(x => x.name === newsgroups[i].name)[0];

                // We have data!
                if (newNewsgroup) {
                    for (let j = newsgroups[i].last + 1; j <= newNewsgroup.last; j++) {
                        newsgroups[i].unread.push(j);
                    }
                    newsgroups[i].last = newNewsgroup.last;
                }
            }

            await this.ngManager.setNewsgroups(newsgroups);
            this.newsgroups = newsgroups.filter(ng => ng.subscribed);
        });
    }

    async refreshNewsgroups() {
        const loader = await this.loadingController.create({
            message: 'Loading...'
        });

        await loader.present();
        await this.updateNewsgroups();
        await loader.dismiss();
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
                        this.refreshNewsgroups();
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
