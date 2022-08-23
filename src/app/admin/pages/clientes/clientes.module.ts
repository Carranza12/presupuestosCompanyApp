import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesComponent } from './clientes.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared.module';


@NgModule({
  declarations: [
    ClientesComponent
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ClientesModule { 
  
}
