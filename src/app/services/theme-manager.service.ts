import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';

@Injectable({
    providedIn: 'root'
})
export class ThemeManagerService {
    private STORAGE_THEME_KEY = 'theme';
    public blackMode = false;

    constructor(private storage: Storage) {
    }

    loadDarkMode() {
        this.storage.get(this.STORAGE_THEME_KEY).then(darkmode => {
            if (darkmode === null || darkmode === undefined) {
                this.blackMode = false;
            } else {
                this.blackMode = darkmode;
                if (this.blackMode) {
                    document.body.classList.toggle('dark');
                }
            }
        });
    }

    public toggleBlackMode() {
        this.blackMode = !this.blackMode;
        document.body.classList.toggle('dark');
        this.storage.set(this.STORAGE_THEME_KEY, this.blackMode);
    }
}
