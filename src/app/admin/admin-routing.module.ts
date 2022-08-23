import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from '../guards/login.guard';

const routes: Routes = [
  {
    path: 'presupuestos', loadChildren: () => import('./pages/presupuestos/presupuestos.module').then(m => m.PresupuestosModule),
    canActivate: [LoginGuard]
  },
  {
    path: 'estadisticas', loadChildren: () => import('./pages/estadisticas/estadisticas.module').then(m => m.EstadisticasModule),
    canActivate: [LoginGuard]
  },
  {
    path: 'clientes', loadChildren: () => import('./pages/clientes/clientes.module').then(m => m.ClientesModule),
    canActivate: [LoginGuard]
  },
  {
    path: 'perfil', loadChildren: () => import('./pages/perfil/perfil.module').then(m => m.PerfilModule),
    canActivate: [LoginGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
