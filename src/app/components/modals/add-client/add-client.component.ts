import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {

  
  public listOfUnidades: any[] = [];

  public clienteForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  })

 


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _data: DataService,
    private _firebase: FirebaseService,
    private dialogRef: MatDialogRef<AddClientComponent>,
    private spinner: NgxSpinnerService
  ) {
    this.dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    
    if (this.data) {
      this.setEditClient();
      
    }
  }


  public setEditClient() {
    this.clienteForm.get('name')?.setValue(this.data.name)
    this.clienteForm.get('address')?.setValue(this.data.address)
    this.clienteForm.get('email')?.setValue(this.data.email)
  }



 


  public saveData() {
    if (this.data) {
      this.updateElement();
      return;
    }
    this.createElement();
  }

  public createElement() {
    if (this.clienteForm.invalid) {
      Swal.fire(
        'Por favor verifica tus datos!',
        'Algunos campos no son válidos!',
        'warning'
      )
      this.clienteForm.markAllAsTouched()
      return;
    }
    
    const data = {
      ... this.clienteForm.value,
      createAt: new Date().getTime(),
      updateAt: new Date().getTime(),
    }
    this.spinner.show();
    this._firebase.addDocument('clientes', data);
    Swal.fire(
      'Buen trabajo!',
      'se guardó con éxito!',
      'success'
    )
    this.spinner.hide();
    this.resetForms()
    this.dialogRef.close()
  }

  public updateElement() {
    if (this.clienteForm.invalid) {
      Swal.fire(
        'Por favor verifica tus datos!',
        'Algunos campos no son válidos!',
        'warning'
      )
      return;
    }
    const data = {
      ... this.clienteForm.value,
      updateAt: new Date().getTime(),
    }
    this.spinner.show();
    this._firebase.updateDocument('clientes', data, this.data.id)
    Swal.fire(
      'Buen trabajo!',
      'se actualizó con éxito!',
      'success'
    )
    this.spinner.hide();
    this.resetForms()
    this.dialogRef.close()
  }

  public resetForms() {
    this.clienteForm.reset()
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
      }
    })

  }

}
