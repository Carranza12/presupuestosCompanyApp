import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { NgxSpinnerService } from "ngx-spinner";
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public sectionActive: string = 'login';
  
  public loginForm:FormGroup=new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required,Validators.minLength(8),Validators.maxLength(16)])
  })

  constructor(private _firebase:FirebaseService, private _router:Router,private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
  }

  public login(){
    setTimeout(() => {
      if(this.loginForm.invalid){
        this.loginForm.markAllAsTouched()
        return;
      }
    const login={
      ...this.loginForm.value
    }
    if(this.loginForm.valid){
      this.spinner.show();
      this._firebase.login(login.email,login.password)
    .then((user)=>{
      this._router.navigateByUrl('admin/presupuestos') 
      this.spinner.hide();
    }).catch((err)=>{
      this.spinner.hide()
      console.log('error');
      Swal.fire(
        'Upss!',
        'Contraseña o correo incorrecto, vuelve a intertarlo!',
        'warning'
      )
    })
    }
    
    }, 1000);
  }
}
