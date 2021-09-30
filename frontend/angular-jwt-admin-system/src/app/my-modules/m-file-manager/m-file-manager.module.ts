import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MFileManagerComponent} from './m-file-manager.component';
import {FileUploadModule} from 'primeng/fileupload';
import {HttpClientModule} from '@angular/common/http';
import {CheckboxModule} from 'primeng/checkbox';
import {ProgressBarModule} from 'primeng/progressbar';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {RippleModule} from 'primeng/ripple';
import {DialogModule} from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';

@NgModule({
  declarations: [MFileManagerComponent],
  imports: [
    CommonModule,
    FileUploadModule,
    HttpClientModule,
    CheckboxModule,
    ProgressBarModule,
    ToggleButtonModule,
    RippleModule,
    DialogModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    InputTextareaModule
  ],
  exports: [MFileManagerComponent]
})
export class MFileManagerModule { }
