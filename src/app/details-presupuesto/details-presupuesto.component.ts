import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FirebaseService } from '../services/firebase.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-details-presupuesto',
  templateUrl: './details-presupuesto.component.html',
  styleUrls: ['./details-presupuesto.component.scss'],
})
export class DetailsPresupuestoComponent implements OnInit {
  public presupuesto: any;
  public isGeneratePDF = false;
  constructor(
    private _routing: ActivatedRoute,
    private _db: AngularFirestore,
    private activatedRoute:ActivatedRoute,
    private _firebase:FirebaseService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    const id = this._routing.snapshot.params['id'];
    const doc = this._db.collection('presupuestos_aprobados').doc(id).get();
    doc.subscribe((snapshot) => {
      const prod = snapshot.data();
      if (!prod) {
        console.log('Error no existe la llave');
      } else {
        console.log(prod)
        this.presupuesto = prod;
      }
    });
  }

  public async generatePDF() {
    this.isGeneratePDF = true;
    setTimeout(async () => {
      this.spinner.show();
      let element:any = document.getElementById('pdf');
      let canvas = await html2canvas(element);
      let contentDataURL = canvas.toDataURL('image/jpeg');
      let pdf = new jsPDF('p', 'mm', 'a4');
      var width = pdf.internal.pageSize.getWidth();
      var height = (canvas.height * width) / canvas.width;
      pdf.addImage(contentDataURL, 'PNG', 0, 0, width, height);
      pdf.save(`${this.presupuesto.full_name}-Presupuesto`);
      this.spinner.hide();
    }, 1000);
  }
}
