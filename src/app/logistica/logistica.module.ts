import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogisticaRoutingModule } from './logistica-routing.module';
import { LogisticaComponent } from './logistica.component';
import { SharedModule } from '../shared.module';


@NgModule({
  declarations: [
    LogisticaComponent
  ],
  imports: [
    CommonModule,
    LogisticaRoutingModule,
    SharedModule
  ]
})
export class LogisticaModule { }
