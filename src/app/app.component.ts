import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  private loading: any;

  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
   /* {
      title: 'Principal',
      url: '/principal',
      icon: 'home'
    },*/
    {
      title: 'Veiculos',
      url: '/list',
      icon: 'ios-car'
    },
    /*{
      title: 'Cadastrar Veiculos',
      url: '/cadastro',
      icon: 'person-add'
    },
    {
      title: 'Abastecimentos',
      url: '/abastecimentos',
      icon: 'person-add'
    },*/
    {
      title: 'Abastecimentos',
      url: '/list-abatecimento',
      icon: 'md-color-fill'
    },
    /* {
       title: 'Manutencao',
       url: '/manutencao',
       icon: 'person-add'
     },*/
    {
      title: 'Manutencâo',
      url: '/list-manutencao',
      icon: 'md-construct'
    },
    /*{
      title: 'Alertas',
      url: '/alerta',
      icon: 'person-add'
    },*/
    {
      title: 'Alertas',
      url: '/list-alerta',
      icon: 'md-alarm'
    },

  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private loadingCtrl: LoadingController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  async logout() {
    await this.presentLoading();

    try {
      await this.authService.logout();
    } catch (error) {
      console.error(error);
    } finally {
      this.loading.dismiss();
    }
  }
  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }
}
