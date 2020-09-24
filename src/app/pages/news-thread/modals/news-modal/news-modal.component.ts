import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {ApiManagerService} from '../../../../services/api-manager.service';
import {NewsInterface} from '../../../../interfaces/news-interface';

@Component({
    selector: 'app-news-modal',
    templateUrl: './news-modal.component.html',
    styleUrls: ['./news-modal.component.scss'],
})
export class NewsModalComponent implements OnInit {
    @Input() news: NewsInterface;
    @Input() group: string;
    completeNews: NewsInterface = null;
    
    author: any = {
        name: 'Infinity News',
        email: 'infinitynews@epita.fr',
        picture: 'https://photos.cri.epita.fr/square/infinity.news'
    };

    constructor(private modalController: ModalController, private api: ApiManagerService) {
    }

    async ngOnInit() {
        this.api.getSpecificNews(this.group, this.news.number).subscribe(async (data) => {
            this.completeNews = data;
            try {
                const name = data.from.split(' ');
                this.author = {
                    name: name.slice(0, -1).join(' '),
                    email: name[name.length - 1].slice(1, -1),
                    avatar: `https://photos.cri.epita.fr/square/${name[name.length - 1].slice(1, -1).split('@')[0]}`
                };
            } catch (e) {
                console.log(e);
            }

            // todo to reformat
            // @ts-ignore
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
