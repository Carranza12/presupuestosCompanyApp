import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArchivadosComponent } from './archivados.component';

const routes: Routes = [{ path: '', component: ArchivadosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArchivadosRoutingModule { }
