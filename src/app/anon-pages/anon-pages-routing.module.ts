import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnonPagesComponent } from './anon-pages.component';

const routes: Routes = [{ path: '', component: AnonPagesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnonPagesRoutingModule { }
