import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from './user.service';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {
  constructor(private userService:UserService, private toast: ToastrService, private router : Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if(this.userService.isUserLoggedIn()){
      return true;
    }
    this.router.navigateByUrl("/login")
    return false;
  }
    //throw new Error('Method not implemented.');
}
