import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";

import { FornecedorRoutingModule } from './fornecedor-routing.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FornecedorComponent } from './component/fornecedor.component';

import { UiSwitchModule } from 'ngx-ui-switch';
import { FornecedorService } from './service/fornecedor.service';

import {IMaskModule} from 'angular-imask';
import { CurrencyMaskModule } from "ngx-currency-mask";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        FornecedorRoutingModule,
        UiSwitchModule,
        NgbModule,
        IMaskModule,
        CurrencyMaskModule
    ],
    providers: [
        FornecedorService
    ],
    declarations: [ FornecedorComponent ]
})
export class FornecedorModule { }
