import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import {AppRoutingModule} from "./app-routing.module";
import { HttpClientModule} from "@angular/common/http";
import {CoreModule} from "./core.module";
import {SharedModule} from "./shared/shared.module";
import {LoggingService} from "./logging.service";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        SharedModule,
        CoreModule,HttpClientModule
    ],
  /*providers: [
    LoggingService
    ],*/
  bootstrap: [AppComponent]
})
export class AppModule { }
