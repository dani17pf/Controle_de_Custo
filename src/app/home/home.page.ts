import { CadastroService } from './../services/cadastro.service';
import { ManutencaoService } from './../services/manutencao.service';
import { AbastecimentosService } from './../services/abastecimentos.service';
import { Component, OnInit } from '@angular/core';

import { Alerta } from 'src/app/dados/alerta';
import { Subscription } from 'rxjs';
import { AlertaService } from 'src/app/services/alerta.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { firestore } from 'firebase/app';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  
  private alerta = new Array<Alerta>();
  private alertaSubscription: Subscription; // Subscription vai chamar os
  private abast: Subscription; // Subscription vai chamar os
  private mnt: Subscription; // Subscription vai chamar os
  private loading: any;
  private totalAbast : any = 0;
  private totalMnt :any =0;
  private veic: Subscription;

  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertaService: AlertaService,
    private toastCtrl: ToastController,
    private abService : AbastecimentosService,
    private mntService : ManutencaoService,
    private veicService : CadastroService
  ) { 
    var hoje = new Date();
    var primeiroDia = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
    var ultimoDia = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0);

   // var dt = firestore.Timestamp.fromDate(primeiroDia);
    console.log(">>>primeiro dia do mês "+ primeiroDia);
    this.alertaSubscription = this.alertaService.getAlertas().subscribe(data => {
      data.forEach((p) =>{
        p.dias = 0;
        console.log(">> "+ p.ultimadata + " >> " + p.tempoalerta);
        var ultimadata = new Date(p.ultimadata);
        ultimadata.setDate(ultimadata.getDate() + (30 * Number(p.tempoalerta)));
        console.log("somando: "+ ultimadata);
        var dias = ultimadata.getTime()  - hoje.getTime();
        dias = dias  / 1000 /  3600 /  24;
        //p.dias = dias
        p.dias = Math.round(dias)
        p.data = ultimadata;
        console.log("número dias q faltam para fazer: "+ dias );
     //  if (p.tipoalerta == "meses" && dias < 30 )
       if (dias < 30 )
           this.alerta.push(p);
       //if (p.tipoalerta == "km" )
      /* this.veic = this.veicService.getCadastro(p.veic).subscribe(data => {
        this.cadastro = data;
      });
      */
      })
    });


    this.abast = this.abService.getAbastecimentos().subscribe(data => {
       data.forEach((p) =>{
        console.log(">>A  "+ p.data + "   " + p.valortotal);
        var dia = new Date(p.data);
         if (dia  > primeiroDia ){
          this.totalAbast += p.valortotal;
          }
       }) 
     });
     this.mnt = this.mntService.getManutencoes().subscribe(data => {
      data.forEach((p) =>{
        console.log(">>M  "+ p.data + "   " + p.valor);
        var dia = new Date(p.data);
         if (dia  > primeiroDia )
         this.totalMnt += p.valor;
      })
    });
   
  }

   /* let teste: Observable<any[]>;
    teste =  this.listPessoa();  //  return this.db.collection('/controle_veiculo', ref => ref.orderBy('con_data_saida').orderBy('con_data_chegada')).valueChanges();
   
    teste.subscribe((dados) => {
      dados.forEach((p) => {
       
            console.log(">>>>> " +JSON.stringify(p));
            
        });
      });
      */
  ngOnInit() {
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }

  
}
