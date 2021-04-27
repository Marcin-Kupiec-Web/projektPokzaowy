import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GrupyComponent } from './grupy.component';

const routes: Routes = [{ path: '', component: GrupyComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GrupyRoutingModule { }
