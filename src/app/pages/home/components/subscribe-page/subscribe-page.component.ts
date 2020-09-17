import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Pages} from '../../home.page';

@Component({
    selector: 'app-subscribe-page',
    templateUrl: './subscribe-page.component.html',
    styleUrls: ['./subscribe-page.component.scss'],
})
export class SubscribePageComponent implements OnInit {
    @Output() changePage = new EventEmitter();
    PagesEnum = Pages;

    constructor() {
    }

    ngOnInit() {
    }

}
