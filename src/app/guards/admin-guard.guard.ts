import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseService } from '../services/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardGuard implements CanActivate {


  constructor( private _firebase: FirebaseService, private _router:Router){}

  async canActivate(
    route: ActivatedRouteSnapshot) {
      const url: string = route.url[0].path;
      const user = await this._firebase.getUser();
      console.log('user:', user);
      console.log('path:',url)
    return true;
  }

}
