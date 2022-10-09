import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseService } from '../services/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(  private _firebase: FirebaseService, private _router:Router){}
  async canActivate(
    route: ActivatedRouteSnapshot){
      const url: string = route.url[0].path;
      const user = await this._firebase.getUser();
      ;
      console.log('user:', user);
      //user.role==='logistica'
      if (user) {
        let path=''
        if (user.role === 'admin' ) path='admin/presupuestos'
        if (user.role === 'logistica' ) path='/logistica'

        console.log(path)
          if (url == 'auth') {
            console.log('si')
            this._router.navigateByUrl(path)
            return false;
          } else {
            return true;
          }
         
          this._firebase.signOut();
          return false;
        
      } else {
        console.log(url)
        if (url == 'auth') {
          return true;
        } else {
          this._router.navigateByUrl('')
          return false;
        }
      }
  
  }
  
}
