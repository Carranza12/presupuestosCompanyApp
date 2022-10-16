import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { GetCollectionsService } from 'src/app/services/get-collections.service';
import Swal from 'sweetalert2';

import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-add-presupuesto',
  templateUrl: './add-presupuesto.component.html',
  styleUrls: ['./add-presupuesto.component.scss'],
})
export class AddPresupuestoComponent implements OnInit {
  public unitsRequerid: number = this.data.how_many_units;
  public listOfUnidades: any[] = [];

  public panelOpenState: boolean = false;

  public presupuestoForm: FormGroup = new FormGroup({
    full_name: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  public descripcionControl: FormControl = new FormControl('', [
    Validators.required,
  ]);
  public cantidadControl: FormControl = new FormControl('', [
    Validators.required,
  ]);
  public precioUnitarioControl: FormControl = new FormControl('', [
    Validators.required,
  ]);
  public unidadControl: FormControl = new FormControl('', [
    Validators.required,
  ]);

  public clientSelectedControl: FormControl = new FormControl('', [
    Validators.required,
  ]);

  public isEditActivity: boolean = false;
  public currentIndexActivity: number = 0;
  public arrayOfActividades: any[] = [];
  public arrayOfActividadesDeleted: any[] = [];
  public listOfClients: any[] = [];
  public listOfClientsFiltered: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _data: DataService,
    private _firebase: FirebaseService,
    private dialogRef: MatDialogRef<AddPresupuestoComponent>,
    private _collections: GetCollectionsService,
    private spinner: NgxSpinnerService
  ) {
    this.dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.listOfUnidades = this._data.getUnidades();
    this.setClient();
  }

  public setClient() {
    this.presupuestoForm.controls['full_name'].setValue(this.data.full_name);
    this.presupuestoForm.controls['email'].setValue(this.data.email);
    this.presupuestoForm.controls['phone'].setValue(this.data.phone);
  }

  public addActividad() {
    
    if (
      this.cantidadControl.invalid ||
      this.descripcionControl.invalid ||
      this.precioUnitarioControl.invalid ||
      this.unidadControl.invalid
    ) {
      this.cantidadControl.markAsTouched();
      this.descripcionControl.markAsTouched();
      this.unidadControl.markAsTouched();
      this.precioUnitarioControl.markAsTouched();
      return;
    }

    const actividad = {
      description: this.descripcionControl.value,
      cantidad: this.cantidadControl.value * this.unitsRequerid,
      unidad: this.unidadControl.value,
      precioUnitario: this.precioUnitarioControl.value * this.unitsRequerid,
      subTotal:(this.cantidadControl.value * this.precioUnitarioControl.value )*this.unitsRequerid,
    };

    if (this.isEditActivity) {
      this.arrayOfActividades[this.currentIndexActivity] = actividad;
      this.isEditActivity = false;
      this.resetActivities();
      return;
    }

    this.arrayOfActividades.push(actividad);
    this.resetActivities();
  }

  public editActividad(actividad: any, index: any) {
    this.isEditActivity = true;
    this.descripcionControl.setValue(actividad.description);
    this.cantidadControl.setValue(actividad.cantidad/this.unitsRequerid);
    this.precioUnitarioControl.setValue(actividad.precioUnitario/this.unitsRequerid);
    this.unidadControl.setValue(actividad.unidad);
    this.currentIndexActivity = index;
  }

  public deleteActividad(index: any) {
    Swal.fire({
      title: 'Estas seguro?',
      text: 'Ya no podrás recuperarlo!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'si, quiero eliminarlo!',
    }).then((result) => {
      if (result.isConfirmed) {
        let actividadDeleted = this.arrayOfActividades.splice(index, 1);
        console.log('actividades actuales: ', this.arrayOfActividades);

        this.arrayOfActividadesDeleted.push(actividadDeleted);
        console.log(' actividades eliminadas:', this.arrayOfActividadesDeleted);

        Swal.fire('Eliminado!', 'La actividad se eliminó con éxito', 'success');
      }
    });
  }

  public saveData() {
    if (this.presupuestoForm.invalid) {
      Swal.fire(
        'Por favor verifica tus datos!',
        'Algunos campos no son válidos!',
        'warning'
      );
      this.presupuestoForm.markAllAsTouched();
      return;
    }
    if (this.arrayOfActividades.length < 1) {
      Swal.fire(
        'Verifica tus actividades!',
        'Debes de agregar por lo menos 1 actividad!',
        'warning'
      );
      return;
    }
    const data = {
      ...this.presupuestoForm.value,
      type_job:this.data.type_job,
      how_many_units:this.data.how_many_units,
      details:this.data.details,
      actividades: this.arrayOfActividades,
      createAt: new Date().getTime(),
      updateAt: new Date().getTime(),
      total: this.arrayOfActividades
        .map((item) => item.subTotal)
        .reduce((prev, curr) => prev + curr, 0),
    };
    console.log(data)
    this.spinner.show();
    this._firebase.deleteDocument('presupuestos_pendientes', this.data.id)
    this._firebase.addDocument('presupuestos_aprobados', data);
    this._firebase.addDocument('presupuestos_cotizados',data);
    Swal.fire('Buen trabajo!', 'se guardó con éxito!', 'success');
    this.spinner.hide();
    this.resetForms();
    this.arrayOfActividades = [];
    this.dialogRef.close();
  }

  public resetForms() {
    this.presupuestoForm.reset();
  }

  public resetActivities() {
    this.descripcionControl.reset();
    this.cantidadControl.reset();
    this.precioUnitarioControl.reset();
    this.unidadControl.reset();
  }

  public closeModal() {
    Swal.fire({
      title: 'Estas seguro de cancelar?',
      text: 'La información escrita se perderá!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'si, quiero salir!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.dialogRef.close();
        console.log('actividades actuales:', this.arrayOfActividades);

        this.arrayOfActividadesDeleted.forEach((activityDeleted) => {
          this.arrayOfActividades.push(activityDeleted);
        });
        console.log(
          ' actividades con las actividades eliminadas:',
          this.arrayOfActividades
        );

        this.arrayOfActividadesDeleted = [];
      }
    });
  }
}
