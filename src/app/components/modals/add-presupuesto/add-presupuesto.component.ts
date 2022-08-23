import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { GetCollectionsService } from 'src/app/services/get-collections.service';
import Swal from 'sweetalert2'

import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-add-presupuesto',
  templateUrl: './add-presupuesto.component.html',
  styleUrls: ['./add-presupuesto.component.scss']
})
export class AddPresupuestoComponent implements OnInit {

  public listOfUnidades: any[] = [];

  public presupuestoForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    Asunto: new FormControl('', [Validators.required, Validators.maxLength(256)]),
  })

  public descripcionControl: FormControl = new FormControl('', [Validators.required]);
  public cantidadControl: FormControl = new FormControl('', [Validators.required]);
  public precioUnitarioControl: FormControl = new FormControl('', [Validators.required]);
  public unidadControl: FormControl = new FormControl('', [Validators.required]);

  public clientSelectedControl: FormControl = new FormControl('', [Validators.required]);

  public isEditActivity: boolean = false;
  public currentIndexActivity: number = 0;
  public arrayOfActividades: any[] = []
  public arrayOfActividadesDeleted: any[] = []
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
    this.initClient();
    this.presupuestoForm.controls['name'].valueChanges.subscribe(value => {
      console.log(value);
      this.filterClientAutocomplet(value)
    })
    if (this.data) {
      this.setEditPresupuesto();
      console.log(this.arrayOfActividades);

    }
  }

  public async initClient() {
    this.listOfClients = await this._collections.getClients();
  }

  public filterClientAutocomplet(value: any) {
    if(value==''){
      this.listOfClientsFiltered=[]
    }
    value = value.toLowerCase();
    this.listOfClientsFiltered = this.listOfClients.filter(client => client.name.toLowerCase().includes(value));
  }

  public setClient(client: any) {
    this.presupuestoForm.controls['email'].setValue(client.email)
    this.presupuestoForm.controls['address'].setValue(client.address)

  }

  public setEditPresupuesto() {
    this.presupuestoForm.get('name')?.setValue(this.data.name)
    this.presupuestoForm.get('address')?.setValue(this.data.address)
    this.presupuestoForm.get('email')?.setValue(this.data.email)
    this.presupuestoForm.get('Asunto')?.setValue(this.data.Asunto)
    this.arrayOfActividades = this.data.actividades
  }

  public addActividad() {
    if (this.cantidadControl.invalid ||
      this.descripcionControl.invalid ||
      this.precioUnitarioControl.invalid ||
      this.unidadControl.invalid) {
      this.cantidadControl.markAsTouched();
      this.descripcionControl.markAsTouched();
      this.unidadControl.markAsTouched();
      this.precioUnitarioControl.markAsTouched();
      return;
    }
    const actividad = {
      description: this.descripcionControl.value,
      cantidad: this.cantidadControl.value,
      unidad: this.unidadControl.value,
      precioUnitario: this.precioUnitarioControl.value,
      subTotal: this.cantidadControl.value * this.precioUnitarioControl.value
    }

    if (this.isEditActivity) {
      this.arrayOfActividades[this.currentIndexActivity] = actividad;
      this.isEditActivity = false;
      this.resetActivities()
      return;
    }

    this.arrayOfActividades.push(actividad)
    this.resetActivities()
  }

  public editActividad(actividad: any, index: any) {

    this.isEditActivity = true;
    this.descripcionControl.setValue(actividad.description)
    this.cantidadControl.setValue(actividad.cantidad)
    this.precioUnitarioControl.setValue(actividad.precioUnitario)
    this.unidadControl.setValue(actividad.unidad)
    this.currentIndexActivity = index;
  }

  public deleteActividad(index: any) {
    Swal.fire({
      title: 'Estas seguro?',
      text: "Ya no podrás recuperarlo!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'si, quiero eliminarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        let actividadDeleted = this.arrayOfActividades.splice(index, 1);
        console.log('actividades actuales: ', this.arrayOfActividades);

        this.arrayOfActividadesDeleted.push(actividadDeleted);
        console.log(' actividades eliminadas:', this.arrayOfActividadesDeleted);

        Swal.fire(
          'Eliminado!',
          'La actividad se eliminó con éxito',
          'success'
        )

      }
    })

  }

  public saveData() {
    if (this.data) {
      this.updateElement();
      return;
    }
    this.createElement();
  }

  public createElement() {
    if (this.presupuestoForm.invalid) {
      Swal.fire(
        'Por favor verifica tus datos!',
        'Algunos campos no son válidos!',
        'warning'
      )
      this.presupuestoForm.markAllAsTouched()
      return;
    }
    if (this.arrayOfActividades.length < 1) {
      Swal.fire(
        'Verifica tus actividades!',
        'Debes de agregar por lo menos 1 actividad!',
        'warning'
      )
      return;
    }
    const data = {
      ... this.presupuestoForm.value,
      actividades: this.arrayOfActividades,
      createAt: new Date().getTime(),
      updateAt: new Date().getTime(),
      total: this.arrayOfActividades.map(item => item.subTotal).reduce((prev, curr) => prev + curr, 0)
    }
    this.spinner.show();
    this._firebase.addDocument('presupuestos', data);
    Swal.fire(
      'Buen trabajo!',
      'se guardó con éxito!',
      'success'
    )
    this.spinner.hide();
    this.resetForms()
    this.arrayOfActividades = [];
    this.dialogRef.close()
  }

  public updateElement() {
    if (this.presupuestoForm.invalid) {
      Swal.fire(
        'Por favor verifica tus datos!',
        'Algunos campos no son válidos!',
        'warning'
      )
      return;
    }
    if (this.arrayOfActividades.length < 1) {
      Swal.fire(
        'Verifica tus actividades!',
        'Debes de agregar por lo menos 1 actividad!',
        'warning'
      )
      return;
    }
    const data = {
      ... this.presupuestoForm.value,
      actividades: this.arrayOfActividades,
      updateAt: new Date().getTime(),
      total: this.arrayOfActividades.map(item => item.subTotal).reduce((prev, curr) => prev + curr, 0)
    }
    this.spinner.show();
    this._firebase.updateDocument('presupuestos', data, this.data.id)
    Swal.fire(
      'Buen trabajo!',
      'se actualizó con éxito!',
      'success'
    )
    this.spinner.hide();
    this.resetForms()
    this.arrayOfActividades = [];
    this.dialogRef.close()
  }

  public resetForms() {
    this.presupuestoForm.reset()

  }

  public resetActivities() {
    this.descripcionControl.reset()
    this.cantidadControl.reset()
    this.precioUnitarioControl.reset()
    this.unidadControl.reset()
  }

  public closeModal() {

    Swal.fire({
      title: 'Estas seguro de cancelar?',
      text: "La información escrita se perderá!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'si, quiero salir!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.dialogRef.close()
        console.log('actividades actuales:', this.arrayOfActividades);

        this.arrayOfActividadesDeleted.forEach(activityDeleted => {
          this.arrayOfActividades.push(activityDeleted)
        })
        console.log(' actividades con las actividades eliminadas:', this.arrayOfActividades);

        this.arrayOfActividadesDeleted = [];
      }
    })

  }
}
