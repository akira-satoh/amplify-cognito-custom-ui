import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthPagesChildRoutingModule } from './auth-pages-child-routing.module';
import { AuthPagesChildComponent } from './auth-pages-child.component';
import { ExampleCComponent } from './example-c/example-c.component';
import { ExampleDComponent } from './example-d/example-d.component';


@NgModule({
  declarations: [AuthPagesChildComponent, ExampleCComponent, ExampleDComponent],
  imports: [
    CommonModule,
    AuthPagesChildRoutingModule
  ]
})
export class AuthPagesChildModule { }
