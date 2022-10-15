import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IngenieroRoutingModule } from './ingeniero-routing.module';
import { IngenieroComponent } from './ingeniero.component';
import { SharedModule } from '../shared.module';


@NgModule({
  declarations: [
    IngenieroComponent
  ],
  imports: [
    CommonModule,
    IngenieroRoutingModule,
    SharedModule
  ]
})
export class IngenieroModule { }
