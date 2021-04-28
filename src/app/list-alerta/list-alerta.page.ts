import { Component, OnInit } from '@angular/core';
import { Alerta } from 'src/app/dados/alerta';
import { Subscription } from 'rxjs';
import { AlertaService } from 'src/app/services/alerta.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-list-alerta',
  templateUrl: './list-alerta.page.html',
  styleUrls: ['./list-alerta.page.scss'],
})
export class ListAlertaPage implements OnInit {
  public alerta = new Array<Alerta>();
  private alertaSubscription: Subscription; // Subscription vai chamar os
  private loading: any;

  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertaService: AlertaService,
    private toastCtrl: ToastController
  ) {
    this.alertaSubscription = this.alertaService.getAlertas().subscribe(data => {
      this.alerta = data;
    });
    
  }

  ngOnInit() {
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }

  async deleteAlerta(id: string) {
    try {
      await this.alertaService.deleteAlerta(id);
    } catch (error) {
      this.presentToast('Erro ao tentar deletar');
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }

}
