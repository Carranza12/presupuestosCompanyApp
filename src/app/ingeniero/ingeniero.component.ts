import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AddPresupuestoComponent } from '../components/modals/add-presupuesto/add-presupuesto.component';
import { PresupuestosPendientesService } from '../services/presupuestos-pendientes.service';

@Component({
  selector: 'app-ingeniero',
  templateUrl: './ingeniero.component.html',
  styleUrls: ['./ingeniero.component.scss'],
})
export class IngenieroComponent implements OnInit {
  public presupuestosPendientes: Array<any> = [];
  constructor(private _presupuestoPendiente: PresupuestosPendientesService,public dialog: MatDialog, private router: Router,private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.loadPresupuestosPendientes();
  }

  private async loadPresupuestosPendientes(): Promise<void> {
    this.presupuestosPendientes =
      await this._presupuestoPendiente.getPresupuestosPendientes();
  }

  public OpenNewPresupuesto(cliente:any):void{
    const dialogRef = this.dialog.open(AddPresupuestoComponent, {
      height: 'auto',
      width: '700px',
      data:cliente
    });
  }

}
