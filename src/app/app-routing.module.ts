import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./auth/auth-routing.module').then(m => m.AuthRoutingModule) },
  { path: 'admin', loadChildren: () => import('./admin/admin-routing.module').then(m => m.AdminRoutingModule) },
  { path: 'web', loadChildren: () => import('./landing/landing.module').then(m => m.LandingModule) },
  { path: 'logistica', loadChildren: () => import('./logistica/logistica.module').then(m => m.LogisticaModule) },
  {path:'**', redirectTo:'auth'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
