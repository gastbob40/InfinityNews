import {Component} from '@angular/core';
import {PopoverController} from '@ionic/angular';
import {PopoverComponent} from './popover/popover.component';
import {ThemeManagerService} from '../../services/theme-manager.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    constructor(public popoverController: PopoverController, public theme: ThemeManagerService) {
        this.theme.loadDarkMode();
    }

    async presentPopover(ev: any) {
        const popover = await this.popoverController.create({
            component: PopoverComponent,
            event: ev,
            translucent: true
        });

        return await popover.present();
    }
}
