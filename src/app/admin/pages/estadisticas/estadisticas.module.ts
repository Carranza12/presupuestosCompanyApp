import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstadisticasRoutingModule } from './estadisticas-routing.module';
import { EstadisticasComponent } from './estadisticas.component';
import { SharedModule } from 'src/app/shared.module';


@NgModule({
  declarations: [
    EstadisticasComponent
  ],
  imports: [
    CommonModule,
    EstadisticasRoutingModule,
    SharedModule
  ]
})
export class EstadisticasModule { }
