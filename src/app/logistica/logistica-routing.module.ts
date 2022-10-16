import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogisticaComponent } from './logistica.component';
import { PresupuestosAprobadosComponent } from './pages/presupuestos-aprobados/presupuestos-aprobados.component';

const routes: Routes = [{ path: '', component: LogisticaComponent },{path:'presupuestos-aprobados', component:PresupuestosAprobadosComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogisticaRoutingModule {}
