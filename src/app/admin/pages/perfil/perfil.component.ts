import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileComponent } from 'src/app/components/modals/edit-profile/edit-profile.component';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  public user:any=[];
  constructor(private _profile:ProfileService,private dialog: MatDialog) { }

  async ngOnInit() {
    this.user= await this._profile.getProfileData()
    console.log(this.user);
    
  }

  editProfile(attribute:string,item:any){
  
      const dialogRef = this.dialog.open(EditProfileComponent, {
        data:{attribute,item},
        height: 'auto',
        width: '300px'
      });
    
    
  }

}
