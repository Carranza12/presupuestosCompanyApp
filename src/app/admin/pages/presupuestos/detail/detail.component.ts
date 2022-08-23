import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { EmailService } from 'src/app/services/email.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ProfileService } from 'src/app/services/profile.service';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  private id:string|null='';
  public presupuesto:any;
  public isGeneratePDF = false;
  public profileData:any;
  constructor(
    private activatedRoute:ActivatedRoute,
    private _firebase:FirebaseService,
    private _email:EmailService,
    private spinner: NgxSpinnerService,
    private _profile:ProfileService
     ) { }

  ngOnInit(): void {
    this.getIdByUrl();
    this.initData()
  }

  getIdByUrl(){
    this.id=this.activatedRoute.snapshot.paramMap.get('id')
  }

  async initData(){
    let data= await this._firebase.getDocument('presupuestos',this.id)
    this.presupuesto = data.data()
    let profile=await this._profile.getProfileData();
    this.profileData=profile

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
      pdf.save(`${this.presupuesto.name}-Presupuesto`);
      this.spinner.hide();
    }, 1000);
  }

  

}
