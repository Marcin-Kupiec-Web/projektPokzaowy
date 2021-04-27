import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivilegesRoutingModule } from './privileges-routing.module';
import { PrivilegesComponent } from './privileges.component';
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

@NgModule({
  declarations: [PrivilegesComponent],
  imports: [
    CommonModule,
    PrivilegesRoutingModule,
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
    MultiSelectModule
  ]
})
export class PrivilegesModule { }




/*
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivilegesRoutingModule } from './privileges-routing.module';
import { PrivilegesComponent } from './privileges.component';
import {ToastModule} from 'primeng/toast';
import {DialogModule} from 'primeng/dialog';
import {SpinnerModule} from 'primeng/spinner';
import {TableModule} from 'primeng/table';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MultiSelectModule} from 'primeng/multiselect';
import {CheckboxModule} from 'primeng/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { FlexLayoutModule } from '@angular/flex-layout';
import {InputTextModule} from 'primeng/inputtext';
import {PasswordModule} from 'primeng/password';
@NgModule({
  declarations: [PrivilegesComponent],
  imports: [
    CommonModule,
    PrivilegesRoutingModule,
    ToastModule,
    DialogModule,
    SpinnerModule,
    TableModule,
    FormsModule, ReactiveFormsModule,
    MultiSelectModule,
    CheckboxModule,
    MatButtonModule,
    MatButtonToggleModule,
    FlexLayoutModule,
    InputTextModule,
    PasswordModule
  ]
})
export class PrivilegesModule { }
*/
