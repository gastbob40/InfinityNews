import {Component, OnInit} from '@angular/core';
import {ThemeManagerService} from '../../services/theme-manager.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
@Component({
    selector: 'app-about',
    templateUrl: './about.page.html',
    styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

    constructor(public themeService: ThemeManagerService, private iab: InAppBrowser) {
    }

    ngOnInit() {
    }

    openEpiMacWebSite() {
        this.iab.create('https://www.epimac.org/', '_system');
    }
}
