import {Component, OnInit} from '@angular/core';
import {PopoverController} from '@ionic/angular';

@Component({
    selector: 'app-popover',
    templateUrl: './popover.component.html',
    styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

    constructor(public popover: PopoverController) {
    }

    ngOnInit() {
    }

    public dismiss(action) {
        this.popover.dismiss(action);
    }

}
