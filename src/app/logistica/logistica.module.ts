import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogisticaRoutingModule } from './logistica-routing.module';
import { LogisticaComponent } from './logistica.component';
import { SharedModule } from '../shared.module';
import { PresupuestosAprobadosComponent } from './pages/presupuestos-aprobados/presupuestos-aprobados.component';


@NgModule({
  declarations: [
    LogisticaComponent,
    PresupuestosAprobadosComponent
  ],
  imports: [
    CommonModule,
    LogisticaRoutingModule,
    SharedModule
  ]
})
export class LogisticaModule { }
