import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {ApiManagerService} from '../../../../services/api-manager.service';
import {NewsInterface} from '../../../../interfaces/news-interface';
import {DataService} from '../../../../services/data.service';
import {NewsgroupManagerService} from '../../../../services/newsgroup-manager.service';
import {NewsGroupInterface} from '../../../../interfaces/news-group-interface';

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

    constructor(private modalController: ModalController, private api: ApiManagerService, private dataService: DataService,
                private ngManager: NewsgroupManagerService) {
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

            const currentNewsgroup: NewsGroupInterface = this.dataService.getData('newsgroup');
            const newsgroups = await this.ngManager.getNewsgroups();
            for (let i = 0; i < newsgroups.length; i++) {
                if (newsgroups[i].name === currentNewsgroup.name) {
                    newsgroups[i].unread = newsgroups[i].unread.filter(x => x !== parseInt(this.completeNews.number, 10));
                }
            }
            currentNewsgroup.unread = currentNewsgroup.unread.filter(x => x !== parseInt(this.completeNews.number, 10));
            this.dataService.setData('newsgroup', currentNewsgroup);
            await this.ngManager.setNewsgroups(newsgroups);

            const bodyParts = this.completeNews.body.replaceAll('\r\n', '\n').split('-- ');
            const chars = bodyParts[0].split('');
            const excludes = ['\n', '\t', '[', '*', '-', '>'];
            for (let i = 0; i < chars.length - 1; i++) {
                if (chars[i] === '\n') {

                    if (!excludes.includes(chars[i + 1])) {
                        chars[i] = ' ';
                    } else {
                        i++;
                    }
                }
            }

            this.completeNews.body = {
                content: chars.join(''),
                signature: bodyParts[bodyParts.length - 1]
            };
        });
    }

    async closeModal() {
        await this.modalController.dismiss();
    }
}

