import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";

import { ProductsRoutingModule } from './products-routing.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ProductsComponent } from './component/products.component';

import { UiSwitchModule } from 'ngx-ui-switch';
import { ProductsService } from './service/products.service';

import {IMaskModule} from 'angular-imask';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ProductsRoutingModule,
        UiSwitchModule,
        NgbModule,
        IMaskModule
    ],
    providers: [
        ProductsService
    ],
    declarations: [ ProductsComponent ]
})
export class ProductsModule { }
