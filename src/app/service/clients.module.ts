import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ClientsComponent } from './component/clients.component';

import { UiSwitchModule } from 'ngx-ui-switch';
import { ClientsService } from './service/clients.service';
@NgModule({
    imports: [
        CommonModule,
        ClientsRoutingModule,
        UiSwitchModule,
        NgbModule,
    ],
    providers: [
         ClientsService
    ],
    declarations: [  ClientsComponent ]
})
export class  ClientsModule { }
