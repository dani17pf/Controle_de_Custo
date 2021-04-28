import { Component, OnInit } from '@angular/core';
import { Manutencao } from 'src/app/dados/manutencao';
import { Subscription } from 'rxjs';
import { ManutencaoService } from 'src/app/services/manutencao.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-list-manutencao',
  templateUrl: './list-manutencao.page.html',
  styleUrls: ['./list-manutencao.page.scss'],
})
export class ListManutencaoPage implements OnInit {
  public manutencao = new Array<Manutencao>();
  private manutencaoSubscription: Subscription; // Subscription vai chamar os
  private loading: any;

  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private manutencaoService: ManutencaoService,
    private toastCtrl: ToastController
  ) {
    this.manutencaoSubscription = this.manutencaoService.getManutencoes().subscribe(data => {
      this.manutencao = data;
    });
    
  }

  ngOnInit() {
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }

  async deleteManutencao(id: string) {
    try {
      await this.manutencaoService.deleteManutencao(id);
    } catch (error) {
      this.presentToast('Erro ao tentar deletar');
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }

}
