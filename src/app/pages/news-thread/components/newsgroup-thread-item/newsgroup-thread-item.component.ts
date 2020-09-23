import {Component, Input, OnInit} from '@angular/core';
import {IonRouterOutlet, ModalController} from '@ionic/angular';
import {NewsModalComponent} from '../../modals/news-modal/news-modal.component';


@Component({
    selector: 'app-newsgroup-thread-item',
    templateUrl: './newsgroup-thread-item.component.html',
    styleUrls: ['./newsgroup-thread-item.component.scss'],
})
export class NewsgroupThreadItemComponent implements OnInit {
    @Input() news;
    @Input() padding: number;

    constructor(public modalController: ModalController) {
    }

    ngOnInit() {
    }

    async showNews() {
        const modal = await this.modalController.create({
            component: NewsModalComponent,
            componentProps: {
                news: this.news.news,
                group: this.news.news.xref.split(' ')[1].split(':')[0]
            }
        });

        return await modal.present();
    }
}
