import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';

import {IBusyConfig} from 'ng-busy';
import {TemplateService} from '../service/template.service';

@Component({
    moduleId: module.id,
    selector: 'demo-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css']
})
export class TableComponent implements OnChanges {

    @Input() loading: IBusyConfig;
    @Input() customTemplate: any;

    constructor(private templateService: TemplateService) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.templateService.setCustomTemplate(this.customTemplate);
    }
}
