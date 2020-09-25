import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {HomePage} from './home.page';

import {HomePageRoutingModule} from './home-routing.module';
import {LoaderComponentComponent} from './components/loader-component/loader-component.component';
import {PopoverComponent} from './popover/settings-popover/popover.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HomePageRoutingModule,
    ],
    declarations: [HomePage, LoaderComponentComponent, PopoverComponent
    ],
    exports: [
        LoaderComponentComponent,
        PopoverComponent
    ]
})
export class HomePageModule {
}
