import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {LocationStrategy, HashLocationStrategy, CommonModule} from '@angular/common';
import { UiSwitchModule } from 'ngx-ui-switch';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from "./shared/shared.module";
import { ToastModule, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { AgmCoreModule } from '@agm/core';
import { AppComponent } from './app.component';
import { ContentLayoutComponent } from "./layouts/content/content-layout.component";
import { FullLayoutComponent } from "./layouts/full/full-layout.component";
import { NgxViacepModule } from "@brunoc/ngx-viacep";
import { CustomOption } from "./shared/toastr/custom-option";

import {AppHttpService} from "./app-http.service";

import { AuthGuard } from './pages/content-pages/login/auth-guard.service';


import * as $ from 'jquery';
import {AppMessageService} from "./app-message.service";
import {AppValidationService} from "./app-validation.service";

@NgModule({
    declarations: [
        AppComponent,
        FullLayoutComponent,
        ContentLayoutComponent
    ],
    imports: [
        BrowserAnimationsModule,
        HttpModule,
        NgSelectModule,
        FormsModule,
        AppRoutingModule,
        SharedModule,
        ToastModule.forRoot(),
        NgbModule.forRoot(),
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyBr5_picK8YJK7fFR2CPzTVMj6GG1TtRGo'
        }),
        UiSwitchModule,
        NgxViacepModule
    ],
    providers: [{
        provide: LocationStrategy,
        useClass: HashLocationStrategy
      },
        //Toastr providers
        { provide: ToastOptions, useClass: CustomOption },
        AppHttpService, AuthGuard, AppMessageService, AppValidationService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }