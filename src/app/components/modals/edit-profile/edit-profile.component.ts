import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {

  public fullName=new FormControl('', Validators.required)

  public address=new FormControl('', Validators.required)

  public location=new FormControl('', Validators.required)
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _profile: ProfileService,
    private spinner: NgxSpinnerService,
    private _dialogRef:MatDialog
  ) {}

  ngOnInit(): void {
    this.fullName.setValue(this.data.item.name)  
    this.address.setValue(this.data.item.address)
    this.location.setValue(this.data.item.location)     
    
  }

  updateData() {
    if (this.data.attribute == 'name') { 
      if(this.fullName?.valid){
        this.spinner.show()
      this._profile.editUser({
        name:this.fullName.value
      }
      );
      this.spinner.hide()
      this._dialogRef.closeAll()
      return;
      }
      this.fullName.markAsTouched()
    }

    if (this.data.attribute == 'address') {            
      if(this.address.valid){
        this.spinner.show()
      this._profile.editUser({
        address:this.address.value
      }
      );
      this.spinner.hide()
      this._dialogRef.closeAll()
      return;
      }
      this.address.markAsTouched()
    }

    if (this.data.attribute === 'location') {       
      if(this.location.valid){
        this.spinner.show()
      this._profile.editUser({
        location:this.location.value
      }
      );
      this.spinner.hide()
      this._dialogRef.closeAll()
      return;
      }
      this.location.markAsTouched()
    }
  }
}
