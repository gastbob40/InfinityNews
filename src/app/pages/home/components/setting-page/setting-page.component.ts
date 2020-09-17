import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ThemeManagerService} from '../../../../services/theme-manager.service';
import {Pages} from '../../home.page';

@Component({
    selector: 'app-setting-page',
    templateUrl: './setting-page.component.html',
    styleUrls: ['./setting-page.component.scss'],
})
export class SettingPageComponent implements OnInit {
    @Output() changePage = new EventEmitter();
    PagesEnum = Pages;

    constructor(public theme: ThemeManagerService) {
    }

    ngOnInit() {
    }

}
