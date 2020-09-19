import {Component} from '@angular/core';
import {PopoverController} from '@ionic/angular';
import {PopoverComponent} from './popover/popover.component';
import {ThemeManagerService} from '../../services/theme-manager.service';

export enum Pages {
    HomePage,
    SettingsPage,
    SubscribePage,
    NewsGroupPage,
}

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    pages = Pages;
    selectedPage = Pages.HomePage;

    constructor(public popoverController: PopoverController, public theme: ThemeManagerService) {
        this.theme.loadDarkMode();
    }

    public setPage(page: Pages) {
        this.selectedPage = page;
    }
}
