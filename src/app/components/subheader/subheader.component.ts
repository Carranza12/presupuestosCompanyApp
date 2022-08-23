import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddClientComponent } from '../modals/add-client/add-client.component';
import { AddPresupuestoComponent } from '../modals/add-presupuesto/add-presupuesto.component';
@Component({
  selector: 'app-subheader',
  templateUrl: './subheader.component.html',
  styleUrls: ['./subheader.component.scss']
})
export class SubheaderComponent implements OnInit {
  @Input() title: string = '';
  @Input() typeModal: string = ''
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  public openModal() {
    if (this.typeModal === 'presupuesto') {
      const dialogRef = this.dialog.open(AddPresupuestoComponent, {
        height: '500px',
        width: '700px'
      });
    }

    if (this.typeModal === 'cliente') {
      const dialogRef = this.dialog.open(AddClientComponent, {
        height: 'auto',
        width: '700px'
      });
    }

   
  }

}
