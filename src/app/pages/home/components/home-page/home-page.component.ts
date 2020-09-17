import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PopoverController} from '@ionic/angular';
import {PopoverComponent} from '../../popover/popover.component';
import {Pages} from '../../home.page';


@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
    @Output() changePage = new EventEmitter();
    PagesEnum = Pages;

    constructor(public popoverController: PopoverController) {
    }

    ngOnInit() {
    }

    async presentPopover(ev: any) {
        const popover = await this.popoverController.create({
            component: PopoverComponent,
            event: ev,
            translucent: true
        });

        await popover.present();

        return popover.onDidDismiss().then(
            (data: any) => {
                if (data) {
                    if (data.data === 'settings') {
                        this.changePage.emit(this.PagesEnum.SettingsPage);
                    }

                    if (data.data === 'subscribe') {
                        this.changePage.emit(this.PagesEnum.SubscribePage);
                    }
                }
            }
        );
    }

}
