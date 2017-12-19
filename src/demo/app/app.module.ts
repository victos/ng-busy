import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {NgBusyModule} from 'ng-busy';

import {AppComponent} from './app.component';
import {GithubCornerComponent} from './github-corner/github-corner.component';
import {HeaderComponent} from './header/header.component';
import {OptionsComponent} from './options/options.component';
import {TableComponent} from './table/table.component';
import {CustomBusyComponent} from './options/options-template';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgBusyModule
  ],
  declarations: [
    AppComponent,
    GithubCornerComponent,
    HeaderComponent,
    OptionsComponent,
    TableComponent,
    CustomBusyComponent
  ],
  entryComponents: [
    CustomBusyComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
