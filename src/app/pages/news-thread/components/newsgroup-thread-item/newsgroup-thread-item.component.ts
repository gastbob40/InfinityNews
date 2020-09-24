import {Component, Input, OnInit} from '@angular/core';
import {IonRouterOutlet, ModalController} from '@ionic/angular';
import {NewsModalComponent} from '../../modals/news-modal/news-modal.component';
import {StaffsInterface} from '../../../../interfaces/staffs-interface';
import {NewsListInterface} from '../../../../interfaces/news-list-interface';
import {NewsInterface} from '../../../../interfaces/news-interface';
import {NewsGroupInterface} from '../../../../interfaces/news-group-interface';
import {DataService} from '../../../../services/data.service';


@Component({
    selector: 'app-newsgroup-thread-item',
    templateUrl: './newsgroup-thread-item.component.html',
    styleUrls: ['./newsgroup-thread-item.component.scss'],
})
export class NewsgroupThreadItemComponent implements OnInit {
    @Input() news: NewsListInterface;
    @Input() padding: number;
    @Input() staffs: StaffsInterface;
    badge: { color: string; slug: string; } = null;
    newsgroup: NewsGroupInterface = null;

    constructor(public modalController: ModalController, private dataService: DataService) {
    }

    ngOnInit() {
        this.newsgroup = this.dataService.getData('newsgroup');
        const name = this.news.news.from.split(' ');
        const email = name[name.length - 1].slice(1, -1);

        if (this.staffs[email] !== undefined) {
            this.badge = this.staffs[email];
        }
    }

    async showNews() {
        const modal = await this.modalController.create({
            component: NewsModalComponent,
            componentProps: {
                news: this.news.news,
                group: this.news.news.xref.split(' ')[1].split(':')[0]
            }
        });

        await modal.present();
        await modal.onDidDismiss();
        console.log('close');
        this.newsgroup = this.dataService.getData('newsgroup');
    }

    shouldMarkUnread(news) {
        return this.newsgroup.unread.includes(parseInt(news.number, 10));
    }

    getColor() {
        return {
            '--background': this.badge.color
        };
    }
}
