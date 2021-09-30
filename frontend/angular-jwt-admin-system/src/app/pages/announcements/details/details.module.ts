import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailsRoutingModule } from './details-routing.module';
import { DetailsComponent } from './details.component';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {GalleriaModule} from 'primeng/galleria';
import {DialogModule} from 'primeng/dialog';
import {SidebarModule} from 'primeng/sidebar';

@NgModule({
  declarations: [DetailsComponent],
  imports: [
    CommonModule,
    DetailsRoutingModule,
    CardModule,
    ButtonModule,
    GalleriaModule,
    DialogModule,
    SidebarModule

  ]
})
export class DetailsModule { }
