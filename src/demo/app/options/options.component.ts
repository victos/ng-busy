/**
 * @file Component: Options
 * @author yumao<yuzhang.lille@gmail.com>
 */

import {Component, Input} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {BUSY_CONFIG_DEFAULTS, IBusyConfig} from 'ng-busy';
import {TemplateService} from '../service/template.service';


@Component({
    moduleId: module.id,
    selector: 'demo-options',
    templateUrl: './options.component.html',
    styleUrls: ['./options.component.css']
})
export class OptionsComponent {
    templateType: string = 'default';
    data: IBusyConfig = Object.assign({}, BUSY_CONFIG_DEFAULTS);

    constructor(private http: HttpClient, private templateService: TemplateService) {
    }

    changeTemplate() {
        this.data.template = this.templateService.getTemplate(this.templateType);
    }

    playDemo() {
        // this.data.busy = this.http.get('https://httpbin.org/delay/3')
        //     .subscribe();

        this.data.busy = this.http.get('https://httpbin.org/delay/1')
            .toPromise();
    }
}
