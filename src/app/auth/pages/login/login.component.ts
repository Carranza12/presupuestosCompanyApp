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

  public userAuth:any;
  constructor(private _firebase:FirebaseService, private _router:Router,private spinner: NgxSpinnerService) { }

  async ngOnInit() {
    this.userAuth= await this._firebase.getUser()
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
      let path='';
     if(this.userAuth.role==='admin') path='admin/presupuestos'
     if(this.userAuth.role==='logistica') path='/logistica'
     if(this.userAuth.role==='ingeniero') path='/ingeniero'
     console.log(path)
     this._router.navigateByUrl(path)
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
