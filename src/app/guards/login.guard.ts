import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MenuController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoggedGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private menuCtrl: MenuController
  ) { }

  canActivate(): Promise<boolean> {
    return new Promise(resolve => {
      this.authService.getAuth().onAuthStateChanged(user => {// metodo detecta "acoes" mudanças do usuario, logado, deslogo
        if (user) this.router.navigate(['home']);

        resolve(!user ? true : false);
         this.menuCtrl.enable(false);//false
      });
    });
  }
}