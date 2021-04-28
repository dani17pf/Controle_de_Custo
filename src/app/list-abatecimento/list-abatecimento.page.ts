import { Component, OnInit } from '@angular/core';
import { Abastecimentos } from '../dados/abastecimentos';
import { Subscription } from 'rxjs';
import { AbastecimentosService } from 'src/app/services/abastecimentos.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-list-abatecimento',
  templateUrl: './list-abatecimento.page.html',
  styleUrls: ['./list-abatecimento.page.scss'],
})
export class ListAbatecimentoPage implements OnInit {

  public abastecimentos = new Array<Abastecimentos>();
  private abastecimentosSubscription: Subscription; // Subscription vai chamar os
  private loading: any;
 

  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private abastecimentosService: AbastecimentosService,
    private toastCtrl: ToastController
  ) {
    this.abastecimentosSubscription = this.abastecimentosService.getAbastecimentos().subscribe(data => {
      this.abastecimentos = data;

      console.log("Lista abastecimento :", data);
    
      
    });
    
  }

  


  ngOnInit() { }


  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }

  async deleteAbastecimentos(id: string) {
    try {
      await this.abastecimentosService.deleteAbastecimento(id);
    } catch (error) {
      this.presentToast('Erro ao tentar deletar');
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }
}