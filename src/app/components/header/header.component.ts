import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { GeneralService } from 'src/app/services/general.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public user:any;

  constructor(
    private _firebase:FirebaseService, 
    private _general:GeneralService,
    public _router:Router,
    public spinner: NgxSpinnerService, 
    ) { }

  ngOnInit(): void {
    this.initData()
  }

  private async initData(){
    this.user= await this._firebase.getUser();
    console.log(this.user)
  }

  public navigateByUrl(typeUrl:string){
    this.spinner.show();
    this._router.navigateByUrl(typeUrl)
    this.spinner.hide();
  }
}
