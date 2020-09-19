import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PopoverController} from '@ionic/angular';
import {PopoverComponent} from '../../popover/popover.component';
import {Pages} from '../../home.page';
import {NewsgroupManagerService} from '../../../../services/newsgroup-manager.service';
import {ApiManagerService} from '../../../../services/api-manager.service';
import {NewsGroupInterface} from '../../../../interfaces/news-group-interface';


@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
    @Output() changePage = new EventEmitter();
    PagesEnum = Pages;
    public newsgroups: NewsGroupInterface[] = null;

    constructor(public popoverController: PopoverController,
                private ngManager: NewsgroupManagerService,
                private apiService: ApiManagerService) {
    }

    async ngOnInit() {
        const newsgroups = await this.ngManager.getNewsgroups();
        this.newsgroups = newsgroups.filter(ng => ng.subscribed);
    }

    public selectNewsgroup(newsgroup: NewsGroupInterface) {
        this.ngManager.setSelectedNewsgroup(newsgroup);
        this.changePage.emit(Pages.NewsGroupPage);
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
                    if (data.data === 'settings') {
                        this.changePage.emit(this.PagesEnum.SettingsPage);
                    }

                    if (data.data === 'subscribe') {
                        this.changePage.emit(this.PagesEnum.SubscribePage);
                    }
                }
            }
        );
    }

}
