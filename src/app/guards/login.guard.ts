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
      if (user) {
        if (user.role === 'admin') {
          if (url == 'auth') {
            this._router.navigateByUrl('admin/presupuestos')
            return false;
          } else {
            return true;
          }
        } else {
          this._firebase.signOut();
          return false;
        }
      } else {
        if (url == 'auth') {
          return true;
        } else {
          this._router.navigateByUrl('login')
          return false;
        }
      }
  
  }
  
}
