import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ClienteEsperaService } from '../services/cliente-espera.service';
import { PresupuestosPendientesService } from '../services/presupuestos-pendientes.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-logistica',
  templateUrl: './logistica.component.html',
  styleUrls: ['./logistica.component.scss'],
})
export class LogisticaComponent implements OnInit {
  public clientesEnEspera: Array<any> = [];
  constructor(
    private _clientesEspera: ClienteEsperaService,
    private _presupuestosPendientes: PresupuestosPendientesService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.loadClientesEspera();
  }

  public async loadClientesEspera(): Promise<void> {
    this.clientesEnEspera = await this._clientesEspera.getClientesEspera();
  }

  public async setPresupuesto(clienteEspera: any): Promise<void> {
    this.spinner.show();
    const { id } = clienteEspera;
    await this._clientesEspera.removeClienteEnEspera(id);
    await this._presupuestosPendientes.setPresupuestoPendiente(clienteEspera);
    Swal.fire(
      'Operación Exitosa!',
      'Él ingeniero recibirá a este cliente en espera para poder realizar un presupuesto ideal.',
      'success'
    );
    this.spinner.hide();
  }
}
