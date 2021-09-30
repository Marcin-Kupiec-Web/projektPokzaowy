import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrupyRoutingModule } from './grupy-routing.module';

import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TableModule} from 'primeng/table';
import { TranslateModule } from '@ngx-translate/core';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import {ToolbarModule} from 'primeng/toolbar';
import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputNumberModule} from 'primeng/inputnumber';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {MultiSelectModule} from 'primeng/multiselect';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { GrupyComponent } from './grupy.component';
import {RippleModule} from 'primeng/ripple';
@NgModule({
  declarations: [GrupyComponent],
  imports: [
    CommonModule,
    GrupyRoutingModule,
    FormsModule, ReactiveFormsModule,
    TableModule,
    TranslateModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    DialogModule,
    ToolbarModule,
    DropdownModule,
    RadioButtonModule,
    InputNumberModule,
    ConfirmDialogModule,
    MultiSelectModule,
    InputTextareaModule,
    RippleModule
    ]
})
export class GrupyModule { }
















/*
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZakladyRoutingModule } from './zaklady-routing.module';
import { ZakladyComponent } from './zaklady.component';
import {ToastModule} from 'primeng/toast';
import {DialogModule} from 'primeng/dialog';
import {TableModule} from 'primeng/table';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {InputTextModule} from 'primeng/inputtext';
import { FlexLayoutModule } from '@angular/flex-layout';
import {InputTextareaModule} from 'primeng/inputtextarea';

@NgModule({
  declarations: [ZakladyComponent],
  imports: [
    CommonModule,
    ZakladyRoutingModule,
    ToastModule,
    DialogModule,
    TableModule,
    FormsModule, ReactiveFormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    InputTextModule,
    FlexLayoutModule,
    InputTextareaModule
  ]
})
export class ZakladyModule { }
*/
