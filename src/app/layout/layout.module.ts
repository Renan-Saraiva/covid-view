import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AppHeaderComponent } from './app-header/app-header.component';
import { AppFooterComponent } from './app-footer/app-footer.component';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [
    AppHeaderComponent,
    AppFooterComponent  
  ],
  imports: [    
    CommonModule,
    RouterModule,
    ComponentsModule
  ],
  exports: [
    AppHeaderComponent,
    AppFooterComponent
  ]
})
export class LayoutModule { }
