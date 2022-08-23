import { Component, OnInit } from '@angular/core';
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
    private _profile:ProfileService, 
    private _general:GeneralService
    ) { }

  ngOnInit(): void {
    this.initData()
  }

  private async initData(){
    this.user= await this._profile.getProfileData();
  }
}
