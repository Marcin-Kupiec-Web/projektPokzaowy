import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RejestryRoutingModule } from './rejestry-routing.module';
import { RejestryComponent } from './rejestry.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TableModule} from 'primeng/table';
import { TranslateModule } from '@ngx-translate/core';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';

@NgModule({
  declarations: [RejestryComponent],
  imports: [
    CommonModule,
    RejestryRoutingModule,
    FormsModule, ReactiveFormsModule,
    TableModule,
    TranslateModule,
    InputTextModule,
    ButtonModule
  ]
})
export class RejestryModule { }
