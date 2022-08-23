import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-detail-presupuesto',
  templateUrl: './detail-presupuesto.component.html',
  styleUrls: ['./detail-presupuesto.component.scss']
})
export class DetailPresupuestoComponent implements OnInit {

  public actividades:any=[]


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _data: DataService,
    private _firebase:FirebaseService,
    private dialogRef: MatDialogRef<DetailPresupuestoComponent>
    ) {
      this.dialogRef.disableClose=true
     }

  ngOnInit(): void {
  }

  public closeModal(){
    this.dialogRef.close();
  }  

}
