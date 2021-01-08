import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MenuController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private menuCtrl: MenuController
  ) { }

  canActivate(): Promise<boolean> {
    return new Promise(resolve => {
      this.authService.getAuth().onAuthStateChanged(user => { // metodo detecta "acoes" mudanças do usuario, logo deslogo
        if (!user) this.router.navigate(['login']); // vai retornar um valor, se for nulo, 
                                                    //  não ta logado, vai ser direcionado pra tela de login
        resolve(user ? true : false);// se existe usuario retorna true, se não false.
        this.menuCtrl.enable(true);
      });
    });
  }
}