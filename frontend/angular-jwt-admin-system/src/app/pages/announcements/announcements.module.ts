import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnouncementsRoutingModule } from './announcements-routing.module';
import { AnnouncementsComponent } from './announcements.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import {ToolbarModule} from 'primeng/toolbar';
import {DialogModule} from 'primeng/dialog';
import {InputNumberModule} from 'primeng/inputnumber';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {DataViewModule} from 'primeng/dataview';
import {DropdownModule} from 'primeng/dropdown';
import {RatingModule} from 'primeng/rating';
import {SkeletonModule} from 'primeng/skeleton';
import {TagModule} from 'primeng/tag';
import {RippleModule} from 'primeng/ripple';
import {MFileManagerModule} from '../../my-modules/m-file-manager/m-file-manager.module'
import {MultiSelectModule} from 'primeng/multiselect';
@NgModule({
  declarations: [AnnouncementsComponent],
  imports: [
    CommonModule,
    AnnouncementsRoutingModule,
    FormsModule, ReactiveFormsModule,
    TranslateModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    DialogModule,
    ToolbarModule,
    InputNumberModule,
    ConfirmDialogModule,
    InputTextareaModule,
    DataViewModule,
    DropdownModule,
    RatingModule,
    SkeletonModule,
    TagModule,
    RippleModule,
    MFileManagerModule,
    MultiSelectModule
  ]
})
export class AnnouncementsModule { }
