import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseService } from '../services/firebase.service';

@Injectable({
  providedIn: 'root',
})
export class LogisticaGuard implements CanActivate {
  constructor(private _firebase: FirebaseService, private _router: Router) {}
  async canActivate(route: ActivatedRouteSnapshot) {
    const url: string = route.url[0].path;
    const user = await this._firebase.getUser();
    console.log(user)
      if (user.role === 'logistica' || user.role === 'admin') {
        return true;
      }
    this._router.navigateByUrl('/auth')
    return false;
  }
}
