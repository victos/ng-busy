import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {BusyConfig, NgBusyModule} from 'ng-busy';

import {AppComponent} from './app.component';
import {GithubCornerComponent} from './github-corner/github-corner.component';
import {HeaderComponent} from './header/header.component';
import {OptionsComponent} from './options/options.component';
import {TableComponent} from './table/table.component';
import {CustomBusyComponent} from './service/options-template';
import {CodeComponent} from './code/code.component';
import {TemplateService} from './service/template.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        NgBusyModule.forRoot(new BusyConfig({
            message: 'Don\'t panic!',
            backdrop: false,
            template: CustomBusyComponent,
            delay: 200,
            minDuration: 600
        }))
    ],
    declarations: [
        AppComponent,
        GithubCornerComponent,
        HeaderComponent,
        OptionsComponent,
        TableComponent,
        CustomBusyComponent,
        CodeComponent
    ],
    entryComponents: [
        CustomBusyComponent
    ],
    providers: [TemplateService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
