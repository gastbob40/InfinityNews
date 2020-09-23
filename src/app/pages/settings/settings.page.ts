import {Component, OnInit} from '@angular/core';
import {ThemeManagerService} from '../../services/theme-manager.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

    constructor(public theme: ThemeManagerService) {
    }

    ngOnInit(): void {
    }

}
