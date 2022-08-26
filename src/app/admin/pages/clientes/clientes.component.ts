import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddClientComponent } from 'src/app/components/modals/add-client/add-client.component';
import { FirebaseService } from 'src/app/services/firebase.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {


  listOfClients: any = [];

  clientes: any;

  public searchControl: FormControl = new FormControl('')

  constructor(private _firebase: FirebaseService, public dialog: MatDialog, private router: Router,private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.initData()
    this.spinner.hide();
  }

  public async initData(): Promise<any> {
    this.listOfClients = await this.getClients();
    this.listenSearchInput();
  }

  public listenSearchInput() {
    this.searchControl.valueChanges.subscribe(value => {
      if(value) this.filterSearch();

    })
  }
  public async getClients(): Promise<any[]> {
    if (this.clientes) {
      return this.clientes;
    }
    this.clientes = [];
    try {
      const ref = this._firebase.getCollectionRef('clientes');
      ref.orderBy('date', 'desc');
      return await this._firebase.generateData(ref, this.clientes);
    } catch (error) {
      return [];
    }
  }

  public async filterSearch() {
    let list = await this.getClients();
    const value = this.searchControl.value.toLowerCase();
    let data = list.filter(
      (item) =>
        item.email.toLowerCase().includes(value) ||
        item.name.toLowerCase().includes(value) 
    );
    this.listOfClients = data;
  }



  public edit(data: any) {
    const dialogRef = this.dialog.open(AddClientComponent, {
      data: data,
      height: 'auto',
      width: '700px'
    });
  }

  public delete(id: string) {
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
        this.spinner.show();
        this._firebase.deleteDocument('clientes', id)
        Swal.fire(
          'Eliminado!',
          'se eliminó el cliente',
          'success'
        )
        this.spinner.hide();
      }
    })

  }

}
