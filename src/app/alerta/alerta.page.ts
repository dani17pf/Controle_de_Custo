import { Component, OnInit } from '@angular/core';
import { Alerta } from 'src/app/dados/alerta';
import { Subscription } from 'rxjs';
import { AlertaService } from 'src/app/services/alerta.service';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController } from '@ionic/angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { firestore } from 'firebase/app';

@Component({
  selector: 'app-alerta',
  templateUrl: './alerta.page.html',
  styleUrls: ['./alerta.page.scss'],
})
export class AlertaPage implements OnInit {
  private alertaId: string = null;
  public alerta: Alerta = {};
  private loading: any;
  private alertaSubscription: Subscription;
  public fGroup: FormGroup;

  customYearValues = [2020, 2016, 2008, 2004, 2000, 1996];
  customDayShortNames = ['s\u00f8n', 'man', 'tir', 'ons', 'tor', 'fre', 'l\u00f8r'];
  customPickerOptions: any;


  fechaNaci: Date = new Date();
  valorData:any;


  constructor(
    private alertaService: AlertaService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private toastCtrl: ToastController,
    public alertController: AlertController,
    private fBuilder: FormBuilder

  ) {
    this.alertaId = this.activatedRoute.snapshot.params['id'];

    if (this.alertaId) this.loadAlerta();

        //validacao
        this.fGroup = this.fBuilder.group({
          'descricao' : [''],
          'ultimadata' : [''],
          'ultimokm' : [''],
          'tempoalerta' : [''],
          'kmalerta' : ['']
        
        });

    this.customPickerOptions = {
      buttons: [{
        text: 'Save',
        handler: (event) =>{
          console.log('Clicked Save!');
          console.log('Mes :',event.month.value);

          this.valorData = event.month.value;
          
          console.log('valor da data:\n', this.fechaNaci);
          
         
          if(this.valorData == this.fechaNaci)
          {
            console.log('entrou no if:\n');
           // this.presentAlert(); 
          }else{
            console.log('else');
            //this.presentAlert(); 
          }         

        }
      }, {
        text: 'Cancela',
        handler: () => {
          console.log('Clicked Cancela.');
          return false;
        }
      }]
    }
   }

  ngOnInit() {
  }
  


  Cambiofecha( event){
    console.log('Clicked event', event);
  
    let fechaNaci: any = new Date(this.fechaNaci);

    let age = Math.round((Math.abs(fechaNaci - this.valorData) / 24 * 60* 60 *1000) / 365);
  
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alerta',
      subHeader: 'Manutenção',
      message: 'Chegou o mês para realizar a manutenção',
      buttons: ['OK']
    });

    await alert.present();
  }

  loadAlerta() {
    this.alertaSubscription = this.alertaService.getAlerta(this.alertaId).subscribe(data => {
      this.alerta = data;
    });
  }

  async saveAlerta() {
    await this.presentLoading();
//    this.alerta.ultimadata =   firestore.Timestamp.fromDate(this.alerta.ultimadata);
   // this.alerta.ultimadata =   new Date();
    this.alerta.userId = this.authService.getAuth().currentUser.uid;

    if (this.alertaId) {
      try {
        await this.alertaService.updateAlerta(this.alertaId, this.alerta);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/list-alerta');
      } catch (error) {
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      }
    } else {
      //this.cadastro.createdAt = new Date().getTime();

      try {
        await this.alertaService.addAlerta(this.alerta);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/list-alerta');
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
