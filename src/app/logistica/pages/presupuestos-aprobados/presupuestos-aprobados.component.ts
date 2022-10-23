import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { PresupuestosAprobadosService } from 'src/app/services/presupuestos-aprobados.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-presupuestos-aprobados',
  templateUrl: './presupuestos-aprobados.component.html',
  styleUrls: ['./presupuestos-aprobados.component.scss'],
})
export class PresupuestosAprobadosComponent implements OnInit {
  public presupuestosAprobados: Array<any> = [];
  constructor(
    private _presupuestosAprobados: PresupuestosAprobadosService,
    public _router: Router
  ) {}

  ngOnInit(): void {
    this.loadPresupuestosAprobados();
    Swal.fire(
      'Lista de presupuestos Aprobados',
      'Aquí se enlista los presupuestos que están listos para ser enviados a los clientes!',
      'info'
    );
  }

  public async loadPresupuestosAprobados(): Promise<void> {
    this.presupuestosAprobados =
      await this._presupuestosAprobados.getPresupuestosAprobados();
  }
  sendWhatsapp(id: any, phone: any) {
    console.log(id);
    console.log(document.location.host);
    //this._router.navigateByUrl('cliente/details/' + id);
    window.open(
      `https://api.whatsapp.com/send?phone=${phone}&text=Hola%20¿qué%20tal%20estás?%20solo%20para%20informarte%20que%20puedes%20ver%20tu%20presupuesto%20en%20la%20siguiente%20liga%20${document.location.host}/cliente/details/${id}`
    );
    Swal.fire(
      'Presupuesto Enviado Correctamente',
      'El cliente ha recibido el presupuesto mediante WhatsApp!',
      'success'
    );
  }

  sendMail(id: any, email: any) {
    console.log(id);
    console.log(document.location.host);
    //this._router.navigateByUrl('cliente/details/' + id);
    window.open(
     
      ` mailto:${email}?subject=Hola%20¿qué%20tal%20estás?%20solo%20para%20informarte%20que%20puedes%20ver%20tu%20presupuesto%20en%20la%20siguiente%20liga%20${document.location.host}/cliente/details/${id}`
    );
    Swal.fire(
      'Presupuesto Enviado Correctamente',
      'El cliente ha recibido el presupuesto mediante su correo electrónico!',
      'success'
    );
  }


}
