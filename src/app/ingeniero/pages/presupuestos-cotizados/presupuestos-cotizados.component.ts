import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { PresupuestosCotizadosService } from 'src/app/services/presupuestos-cotizados.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-presupuestos-cotizados',
  templateUrl: './presupuestos-cotizados.component.html',
  styleUrls: ['./presupuestos-cotizados.component.scss'],
})
export class PresupuestosCotizadosComponent implements OnInit {
  public presupuestosCotizados: Array<any> = [];
  public presupuestoSelected!:any;
  public isGeneratePDF = false;
  constructor(
    private _firebase: FirebaseService,
    private _presupuestosCotizados: PresupuestosCotizadosService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.loadPresupuestosCotizados();
  }

  private async loadPresupuestosCotizados(): Promise<void> {
    this.presupuestosCotizados =
      await this._presupuestosCotizados.getPresupuestosCotizados();
  }

  public generatePDF(item:any): void {
    this.presupuestoSelected=item;
    this.isGeneratePDF = true;
    setTimeout(async () => {
      this.spinner.show();
      let element: any = document.getElementById('pdf');
      let canvas = await html2canvas(element);
      let contentDataURL = canvas.toDataURL('image/jpeg');
      let pdf = new jsPDF('p', 'mm', 'a4');
      var width = pdf.internal.pageSize.getWidth();
      var height = (canvas.height * width) / canvas.width;
      pdf.addImage(contentDataURL, 'PNG', 0, 0, width, height);
      pdf.save(`${item.full_name}-Presupuesto`);
      this.spinner.hide();
    }, 1000);
  }
}
