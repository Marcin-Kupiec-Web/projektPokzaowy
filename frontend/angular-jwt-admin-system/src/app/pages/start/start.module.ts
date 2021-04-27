import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StartRoutingModule } from './start-routing.module';
import { StartComponent } from './start.component';
import { UiModule } from '../../ui/ui.module';

@NgModule({
  declarations: [StartComponent],
  imports: [
    CommonModule,
    UiModule,
    StartRoutingModule
  ]
})
export class StartModule { }
