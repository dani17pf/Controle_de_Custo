import { Component, OnInit } from '@angular/core';
import { Cadastro } from 'src/app/dados/cadastro';
import { Subscription } from 'rxjs';
import { CadastroService } from 'src/app/services/cadastro.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  
  public cadastros = new Array<Cadastro>();
  private cadastrosSubscription: Subscription; // Subscription vai chamar os
  private loading: any;
 

  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private cadastrosService: CadastroService,
    private toastCtrl: ToastController
  ) {
    this.cadastrosSubscription = this.cadastrosService.getCadastros().subscribe(data => {
      this.cadastros = data;
    });
    
  }

  ngOnInit() { }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }

  async deleteCadastros(id: string) {
    try {
      await this.cadastrosService.deleteCadastro(id);
    } catch (error) {
      this.presentToast('Erro ao tentar deletar');
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }
}