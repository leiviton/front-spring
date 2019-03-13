import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { UsersComponent } from './component/users.component';

import { UiSwitchModule } from 'ngx-ui-switch';
import { UsersService } from './service/users.service';
@NgModule({
    imports: [
        CommonModule,
        UsersRoutingModule,
        UiSwitchModule,
        NgbModule,
    ],
    providers: [
        UsersService
    ],
    declarations: [ UsersComponent ]
})
export class UsersModule { }
