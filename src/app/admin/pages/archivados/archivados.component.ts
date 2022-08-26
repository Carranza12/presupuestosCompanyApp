import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ArchivedService } from 'src/app/services/archived.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-archivados',
  templateUrl: './archivados.component.html',
  styleUrls: ['./archivados.component.scss']
})
export class ArchivadosComponent implements OnInit {

 
  listOfArchived: any = [];

  clientes: any;

  public searchControl: FormControl = new FormControl('')

  constructor( 
    private _archiveds:ArchivedService,
    public dialog: MatDialog, 
    private router: Router,
    private spinner: NgxSpinnerService,
    private _firebase:FirebaseService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.initData()
    this.spinner.hide();
  }

  public async initData(): Promise<any> {
    this.listOfArchived = await this._archiveds.getArchiveds();
    this.listenSearchInput();
  }

  public listenSearchInput() {
    this.searchControl.valueChanges.subscribe(value => {
      this.filterSearch();
    })
  }

  public desArchive(element:any){

    
    Swal.fire({
      title: 'Estas seguro?',
      text: "Este archivo se mandará a Presupuestos!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'si, quiero desarchivarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show();
        this._firebase.addDocument('presupuestos',element);
        this._firebase.deleteDocument('archiveds',element.id);
        Swal.fire(
          'Desarchivado!',
          'La actividad se desarchivó con éxito',
          'success'
        )

        this.spinner.hide();
      }
    })

    
  }

  public async filterSearch() {
    let list = await this._archiveds.getArchiveds();
    const value = this.searchControl.value.toLowerCase();
    let data = list.filter(
      (item) =>
        item.Asunto.toLowerCase().includes(value) ||
        item.name.toLowerCase().includes(value)
    );
    this.listOfArchived = data;
  }





 

}
