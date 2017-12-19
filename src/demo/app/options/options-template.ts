/**
 * @file Options Template
 * @author yumao<yuzhang.lille@gmail.com>
 */

import {BUSY_CONFIG_DEFAULTS} from 'ng-busy';
import {Component, Inject} from '@angular/core';

@Component({
  selector: 'default-busy',
  template: `
    <div style="background: url('asset/img/du.gif') no-repeat center 20px; background-size: 72px;">
      <div style="margin-top: 110px; text-align: center; font-size: 18px; font-weight: 700;">
        {{message}}
      </div>
    </div>
  `,
})
export class CustomBusyComponent {
  constructor(@Inject('message')public message: string) {};
}

export const OPTIONS_TEMPLATE: Object = {
    default: BUSY_CONFIG_DEFAULTS.template,
    custom: CustomBusyComponent
};
