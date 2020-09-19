import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-newsgroup-thread-item',
    templateUrl: './newsgroup-thread-item.component.html',
    styleUrls: ['./newsgroup-thread-item.component.scss'],
})
export class NewsgroupThreadItemComponent implements OnInit {
    @Input() news;
    @Input() padding: number;

    constructor() {
    }

    ngOnInit() {
    }

    getPadding() {
        const paddingSpace = 10;
        return
    }

}
