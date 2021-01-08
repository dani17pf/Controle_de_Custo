import { Component, OnInit } from '@angular/core';
import { Cadastro } from 'src/app/dados/cadastro';
import { Subscription } from 'rxjs';
import { CadastroService } from 'src/app/services/cadastro.service';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  private cadastroId: string = null;
  public cadastro: Cadastro = {};
  private loading: any;
  private cadastroSubscription: Subscription;

  constructor(
    private cadastroService: CadastroService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private toastCtrl: ToastController
  ) {
    this.cadastroId = this.activatedRoute.snapshot.params['id'];

    if (this.cadastroId) this.loadCadastro();
  }


  ngOnInit() {
  }

  //ngOnDestroy() {
    //if (this.cadastroSubscription) this.cadastroSubscription.unsubscribe();
  //}

  loadCadastro() {
    this.cadastroSubscription = this.cadastroService.getCadastro(this.cadastroId).subscribe(data => {
      this.cadastro = data;
    });
  }

  async saveCadastro() {
    await this.presentLoading();

    //this.cadastro.userId = this.authService.getAuth().currentUser.uid;

    if (this.cadastroId) {
      try {
        await this.cadastroService.updateCadastro(this.cadastroId, this.cadastro);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/list');
      } catch (error) {
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      }
    } else {
      //this.cadastro.createdAt = new Date().getTime();

      try {
        await this.cadastroService.addCadastro(this.cadastro);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/list');
      } catch (error) {
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      }
    }
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }

}
