import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngenieroComponent } from './ingeniero.component';
import { PresupuestosCotizadosComponent } from './pages/presupuestos-cotizados/presupuestos-cotizados.component';

const routes: Routes = [
  { path: '', component: IngenieroComponent },
  { path: 'presupuestos-cotizados', component: PresupuestosCotizadosComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IngenieroRoutingModule {}
