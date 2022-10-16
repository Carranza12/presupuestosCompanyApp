import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IngenieroRoutingModule } from './ingeniero-routing.module';
import { IngenieroComponent } from './ingeniero.component';
import { SharedModule } from '../shared.module';
import { PresupuestosCotizadosComponent } from './pages/presupuestos-cotizados/presupuestos-cotizados.component';
import { DetailsPDFComponent } from './pages/details-pdf/details-pdf.component';


@NgModule({
  declarations: [
    IngenieroComponent,
    PresupuestosCotizadosComponent,
    DetailsPDFComponent
  ],
  imports: [
    CommonModule,
    IngenieroRoutingModule,
    SharedModule
  ]
})
export class IngenieroModule { }
