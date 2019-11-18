import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnonPagesRoutingModule } from './anon-pages-routing.module';
import { AnonPagesComponent } from './anon-pages.component';


@NgModule({
  declarations: [AnonPagesComponent],
  imports: [
    CommonModule,
    AnonPagesRoutingModule
  ]
})
export class AnonPagesModule { }
