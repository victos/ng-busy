import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgBusyModule } from 'ng-busy';

import { AppComponent }  from './app.component';

@NgModule({
  imports:      [ BrowserModule, NgBusyModule],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
