import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PresupuestosRoutingModule } from './presupuestos-routing.module';
import { PresupuestosComponent } from './presupuestos.component';
import { SharedModule } from 'src/app/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DetailComponent } from './detail/detail.component';


@NgModule({
  declarations: [
    PresupuestosComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    PresupuestosRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class PresupuestosModule { }
