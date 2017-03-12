import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {Ng2PaginationModule} from 'ng2-pagination';
import {MomentModule} from 'angular2-moment';
import { DropdownModule } from 'ng2-bootstrap';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import {SlimLoadingBarModule} from 'ng2-slim-loading-bar';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule, Ng2AutoCompleteModule, Ng2PaginationModule, MomentModule, DropdownModule.forRoot(), SlimLoadingBarModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
