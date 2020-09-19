import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {ApiManagerService} from '../../../../services/api-manager.service';

@Component({
    selector: 'app-news-modal',
    templateUrl: './news-modal.component.html',
    styleUrls: ['./news-modal.component.scss'],
})
export class NewsModalComponent implements OnInit {
    @Input() news: any;
    @Input() group: string;

    completeNews: null;
    author: any = {
        name: '',
        email: '',
        picture: ''
    };

    constructor(private modalController: ModalController, private api: ApiManagerService) {
    }

    async ngOnInit() {
        this.api.getSpecificNews(this.group, this.news.number).subscribe(async (data) => {
            this.completeNews = data;
            const name = data.from.split(' ');
            this.author = {
                name: `${name[0]} ${name[1]}`,
                email: name[2].slice(1, -1),
                avatar: `https://photos.cri.epita.fr/square/${name[2].slice(1, -1).split('@')[0]}`
            };

            // todo to reformat
            this.completeNews.body = this.completeNews.body
                .replaceAll('-- \r\n', '\r\t\r\t')
                .replaceAll('\r\n\r\n', '\r\r\r')
                .replaceAll('\r\n', ' ')
                .replaceAll('\r\r\r', '\n\n')
                .replaceAll('\r\t\r\t', '-- \n');
        });
    }


    async closeModal() {
        await this.modalController.dismiss();
    }

}
