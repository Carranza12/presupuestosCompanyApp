import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArchivadosRoutingModule } from './archivados-routing.module';
import { ArchivadosComponent } from './archivados.component';
import { SharedModule } from 'src/app/shared.module';


@NgModule({
  declarations: [
    ArchivadosComponent
  ],
  imports: [
    CommonModule,
    ArchivadosRoutingModule,
    SharedModule
  ]
})
export class ArchivadosModule { }
