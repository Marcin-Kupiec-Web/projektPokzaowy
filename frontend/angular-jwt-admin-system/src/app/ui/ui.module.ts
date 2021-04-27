import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopNavComponent } from './top-nav/top-nav.component';
import { FooterComponent } from './footer/footer.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { LayoutComponent } from './layout/layout.component';
import { ContentComponent } from './content/content.component';
import {ButtonModule} from 'primeng/button';
import { RouterModule } from '@angular/router';
import {RippleModule} from 'primeng/ripple';
import {AccordionModule} from 'primeng/accordion';
import {PanelMenuModule} from 'primeng/panelmenu';

@NgModule({
  declarations: [TopNavComponent, FooterComponent, SideNavComponent, LayoutComponent, ContentComponent],
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    RippleModule,
    AccordionModule,
    PanelMenuModule
  ],
  exports: [LayoutComponent]
})
export class UiModule { }
