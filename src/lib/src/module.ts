import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusyComponent } from './component/busy.component';
import { BusyBackdropComponent } from './component/busy-backdrop.component';
import { BusyService } from './service/busy.service';
import { TrackerService } from './service/tracker.service';
import { BusyDirective } from './directive/busy.directive';
import { DefaultBusyComponent } from './model/busy-config';

@NgModule({
  imports: [CommonModule],
  declarations: [BusyComponent, BusyBackdropComponent, BusyDirective, DefaultBusyComponent],
  providers: [BusyService, TrackerService],
  exports: [BusyDirective],
  entryComponents: [BusyBackdropComponent, BusyComponent, DefaultBusyComponent]
})
export class NgBusyModule { }
