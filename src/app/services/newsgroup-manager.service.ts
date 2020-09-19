import {Injectable} from '@angular/core';
import {NewsGroupInterface} from '../interfaces/news-group-interface';
import {Storage} from '@ionic/storage';

@Injectable({
    providedIn: 'root'
})
export class NewsgroupManagerService {
    private STORAGE_NEWSGROUPS_KEY = 'newsgroups';
    private STORAGE_SELECTED_NEWSGROUP_KEY = 'newsgroup';
    private newsgroups: NewsGroupInterface[] = null;
    private selectedNewsgroup: NewsGroupInterface = null;

    constructor(private storage: Storage) {
    }

    async getNewsgroups() {
        if (this.newsgroups == null) {
            this.newsgroups = await this.storage.get(this.STORAGE_NEWSGROUPS_KEY);

            if (this.newsgroups === null || this.newsgroups === undefined) {
                await this.setNewsgroups([]);
            }
        }

        return this.newsgroups;
    }

    async getSelectedNewsgroup() {
        if (this.selectedNewsgroup == null) {
            this.selectedNewsgroup = await this.storage.get(this.STORAGE_SELECTED_NEWSGROUP_KEY);
        }

        return this.selectedNewsgroup;
    }

    async setNewsgroups(newsgroups: NewsGroupInterface[]) {
        this.newsgroups = newsgroups;
        await this.storage.set(this.STORAGE_NEWSGROUPS_KEY, this.newsgroups);
    }

    async setSelectedNewsgroup(newsgroup: NewsGroupInterface) {
        this.selectedNewsgroup = newsgroup;
        await this.storage.set(this.STORAGE_SELECTED_NEWSGROUP_KEY, this.selectedNewsgroup);
    }


}
