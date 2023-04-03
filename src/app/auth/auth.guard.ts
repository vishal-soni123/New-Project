import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import {  Router, Route } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  x:any=[];
  constructor(private router: Router) {
    const Temp:any = localStorage.getItem('data');
    console.log(Temp)
    if(Temp!=null){
      this.x=JSON.parse(Temp);
      this.x.forEach((value:any) => {
     
        console.log(       value.email,
          value.password);
      });
    }

   }
   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
   boolean | Observable<boolean> | Promise<boolean> {
    this.x.forEach((value:any) => {
           if (!this.x) {
       this.router.navigate(['login']);
     }
    });

     return true;
   }
  
}
