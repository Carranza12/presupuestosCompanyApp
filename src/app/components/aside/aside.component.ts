import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import { NgxSpinnerService } from "ngx-spinner";
import { FirebaseService } from 'src/app/services/firebase.service';
@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {

  constructor(public _router:Router, public _general:GeneralService, public spinner: NgxSpinnerService, private _firebase:FirebaseService) { }

  ngOnInit(): void {
  }

  public navigateByUrl(typeUrl:string){
    this.spinner.show();
    this._router.navigateByUrl(typeUrl)
    this.spinner.hide();
  }

  public logout(){
    this._firebase.signOut().then(() => {
      window.location.reload();
    });
  }

}
