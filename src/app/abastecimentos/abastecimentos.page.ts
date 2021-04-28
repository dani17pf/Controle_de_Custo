import { Component, OnInit } from '@angular/core';
import { Abastecimentos } from 'src/app/dados/abastecimentos';
import { Subscription } from 'rxjs';
import { AbastecimentosService } from 'src/app/services/abastecimentos.service';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import {CadastroService} from 'src/app/services/cadastro.service'
import { Cadastro } from 'src/app/dados/cadastro';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-abastecimentos',
  templateUrl: './abastecimentos.page.html',
  styleUrls: ['./abastecimentos.page.scss'],
})
export class AbastecimentosPage implements OnInit {
  private abastecimentosId: string = null;
  public abastecimentos: Abastecimentos = {};
  private loading: any;
  private abastecimentosSubscription: Subscription;
  //public cadastro: Cadastro = [];
  cadastros: Cadastro[];
  public fGroup: FormGroup;

  constructor(
    private abastecimentosService: AbastecimentosService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private toastCtrl: ToastController,
    private cadastroService: CadastroService,
    private fBuilder: FormBuilder

  ) {
    this.abastecimentosId = this.activatedRoute.snapshot.params['id'];

    if (this.abastecimentosId) this.loadAbastecimentos();

        //validacao
        this.fGroup = this.fBuilder.group({
          'data' : [''],
          'odometro' : [''],
          'precolitro' : [''],
          'valortotal' : [''],
          'litros' : ['']
        });

  }

  ngOnInit() {
    this.abastecimentosId = this.activatedRoute.snapshot.params['id'];

    this.cadastroService.getCadastros().subscribe(res => { //busca os veiculos
      this.cadastros = res;
    })
  }

  loadAbastecimentos() {
    this.abastecimentosSubscription = this.abastecimentosService.getAbastecimento(this.abastecimentosId).subscribe(data => {
      this.abastecimentos = data;
    });
  }

  async saveAbastecimentos() {
    await this.presentLoading();

    this.abastecimentos.userId = this.authService.getAuth().currentUser.uid;

    if (this.abastecimentosId) {
      try {
        await this.abastecimentosService.updateAbastecimento(this.abastecimentosId, this.abastecimentos);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/list-abatecimento');
      } catch (error) {
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      }
    } else {
      try {
        await this.abastecimentosService.addAbastecimento(this.abastecimentos);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/list-abatecimento');
      } catch (error) {
        this.presentToast('Todos os campos são obrigatório !!');
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
