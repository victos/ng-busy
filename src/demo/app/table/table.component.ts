import {Component, Input} from '@angular/core';

import {IBusyConfig} from 'ng-busy';

@Component({
  moduleId: module.id,
  selector: 'demo-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  @Input() loading: IBusyConfig;
}
