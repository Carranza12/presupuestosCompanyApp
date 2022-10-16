import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { PresupuestosAprobadosService } from 'src/app/services/presupuestos-aprobados.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-presupuestos-aprobados',
  templateUrl: './presupuestos-aprobados.component.html',
  styleUrls: ['./presupuestos-aprobados.component.scss']
})
export class PresupuestosAprobadosComponent implements OnInit {
  public presupuestosAprobados:Array<any>=[];
  constructor(private _presupuestosAprobados:PresupuestosAprobadosService) { }

  ngOnInit(): void {
    this.loadPresupuestosAprobados();
    Swal.fire('Lista de presupuestos Aprobados', 'Aquí se enlista los presupuestos que están listos para ser enviados a los clientes!', 'info');
  }

  public async loadPresupuestosAprobados():Promise<void>{
    this.presupuestosAprobados= await this._presupuestosAprobados.getPresupuestosAprobados();
    console.log(this.presupuestosAprobados)
  }

}
