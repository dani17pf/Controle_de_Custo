import { Component, OnInit } from '@angular/core';
import { Manutencao } from 'src/app/dados/manutencao';
import { Subscription } from 'rxjs';
import { ManutencaoService } from 'src/app/services/manutencao.service';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import {CadastroService} from 'src/app/services/cadastro.service'
import { Cadastro } from 'src/app/dados/cadastro';


@Component({
  selector: 'app-manutencao',
  templateUrl: './manutencao.page.html',
  styleUrls: ['./manutencao.page.scss'],
})
export class ManutencaoPage implements OnInit {
  private manutencaoId: string = null;
  public manutencao: Manutencao = {};
  private loading: any;
  private manutencaoSubscription: Subscription;
  cadastros: Cadastro[];
  public fGroup: FormGroup;

  constructor(
    private manutencaoService: ManutencaoService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private toastCtrl: ToastController,
    private fBuilder: FormBuilder,
    private cadastroService: CadastroService
   
  ) {
    this.manutencaoId = this.activatedRoute.snapshot.params['id'];

    this.cadastroService.getCadastros().subscribe(res => { //busca os veiculos
      this.cadastros = res;
    })

    if (this.manutencaoId) this.loadManutencao();

        //validacao
        this.fGroup = this.fBuilder.group({
          'descricao' : [''],
          'data' : [''],
          'valor' : [''],
          'km' : ['']
        });

   }

  ngOnInit() {
  }

  loadManutencao() {
    this.manutencaoSubscription = this.manutencaoService.getManutencao(this.manutencaoId).subscribe(data => {
      this.manutencao = data;
    });
  }

  async saveManutencao() {
    await this.presentLoading();

    this.manutencao.userId = this.authService.getAuth().currentUser.uid;

    if (this.manutencaoId) {
      try {
        await this.manutencaoService.updateManutencao(this.manutencaoId, this.manutencao);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/list-manutencao');
      } catch (error) {
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      }
    } else {
      //this.cadastro.createdAt = new Date().getTime();

      try {
        await this.manutencaoService.addManutencao(this.manutencao);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/list-manutencao');
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
