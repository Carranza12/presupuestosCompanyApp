import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngenieroComponent } from './ingeniero.component';

const routes: Routes = [{ path: '', component: IngenieroComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IngenieroRoutingModule { }
