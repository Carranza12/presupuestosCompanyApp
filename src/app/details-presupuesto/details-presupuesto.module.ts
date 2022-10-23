import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailsPresupuestoRoutingModule } from './details-presupuesto-routing.module';
import { DetailsPresupuestoComponent } from './details-presupuesto.component';
import { SharedModule } from '../shared.module';


@NgModule({
  declarations: [
    DetailsPresupuestoComponent
  ],
  imports: [
    CommonModule,
    DetailsPresupuestoRoutingModule,
    SharedModule
  ],
  exports:[
    DetailsPresupuestoComponent
  ]
})
export class DetailsPresupuestoModule { }
