import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuardGuard } from './guards/admin-guard.guard';
import { IngenieroGuard } from './guards/ingeniero.guard';
import { LogisticaGuard } from './guards/logistica.guard';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./auth/auth-routing.module').then(m => m.AuthRoutingModule) },
  { path: 'admin', loadChildren: () => import('./admin/admin-routing.module').then(m => m.AdminRoutingModule), canActivate:[AdminGuardGuard]},
  { path: 'web', loadChildren: () => import('./landing/landing.module').then(m => m.LandingModule) },
  { path: 'logistica', loadChildren: () => import('./logistica/logistica.module').then(m => m.LogisticaModule), canActivate:[LogisticaGuard]},
  { path: 'ingeniero', loadChildren: () => import('./ingeniero/ingeniero.module').then(m => m.IngenieroModule), canActivate:[IngenieroGuard] },
  {path:'**', redirectTo:'auth'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
