import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RejestryComponent } from './rejestry.component';

const routes: Routes = [{ path: '', component: RejestryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RejestryRoutingModule { }
