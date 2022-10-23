import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsPresupuestoComponent } from './details-presupuesto.component';

const routes: Routes = [{ path: '', component: DetailsPresupuestoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailsPresupuestoRoutingModule { }
