import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-loader-component',
    templateUrl: './loader-component.component.html',
    styleUrls: ['./loader-component.component.scss'],
})
export class LoaderComponentComponent implements OnInit {
    constructor() {
    }

    array(): any[] {
        return Array(10).fill(1);
    }

    ngOnInit(): void {
    }

}
