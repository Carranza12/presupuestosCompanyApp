import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddPresupuestoComponent } from 'src/app/components/modals/add-presupuesto/add-presupuesto.component';
import { FirebaseService } from 'src/app/services/firebase.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
import { ArchivedService } from 'src/app/services/archived.service';
@Component({
  selector: 'app-presupuestos',
  templateUrl: './presupuestos.component.html',
  styleUrls: ['./presupuestos.component.scss']
})
export class PresupuestosComponent implements OnInit {

  listOfPresupuestos:any=[];

  presupuestos:any;

  public searchControl:FormControl=new FormControl('')

  constructor(
    private _firebase:FirebaseService,
     public dialog: MatDialog, 
     private router:Router,
     private spinner: NgxSpinnerService,
     private _archiveds:ArchivedService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.initData()
    this.spinner.hide();
  }

  public async initData():Promise<any>{
    this.listOfPresupuestos= await this.getPresupuestos();
    this.listenSearchInput();
  }

  public listenSearchInput(){
    this.searchControl.valueChanges.subscribe(value=>{
      this.filterSearch();
    })
  }
  public async getPresupuestos(): Promise<any[]> {
    if (this.presupuestos) {
      return this.presupuestos;
    }
    this.presupuestos = [];
    try {
      const ref = this._firebase.getCollectionRef('presupuestos');
      ref.orderBy('date', 'desc');
      return await this._firebase.generateData(ref, this.presupuestos);
    } catch (error) {
      return [];
    }
  }

  public async filterSearch() {
    let list = await this.getPresupuestos();
    const value = this.searchControl.value.toLowerCase();
    let data = list.filter(
      (item) =>
        item.Asunto.toLowerCase().includes(value) ||
        item.name.toLowerCase().includes(value) 
    );
    this.listOfPresupuestos = data;
  }

  public viewDetail(data:any){
    this.spinner.show();
    this.router.navigateByUrl('/admin/presupuestos/detail/'+data.id)
    this.spinner.hide();
  }

  public edit(data:any){
    const dialogRef = this.dialog.open( AddPresupuestoComponent, {
      data:data,
      height: '500px',
        width: '700px'
    });
  }

  public archive(element:any){

    
    Swal.fire({
      title: 'Estas seguro?',
      text: "Este archivo se mandará a archivados!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'si, quiero archivarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show();
        this._firebase.addDocument('archiveds',element);
        this._firebase.deleteDocument('presupuestos',element.id);
        Swal.fire(
          'Archivado!',
          'La actividad se archivó con éxito',
          'success'
        )

        this.spinner.hide();
      }
    })

    
  }
}
