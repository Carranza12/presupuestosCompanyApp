import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './detail/detail.component';
import { PresupuestosComponent } from './presupuestos.component';

const routes: Routes = [
  { path: '', component: PresupuestosComponent }, 
  {path:'detail/:id', component: DetailComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PresupuestosRoutingModule { }
