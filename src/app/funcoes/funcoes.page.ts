import { Component, OnInit } from '@angular/core';
import { Gyroscope, GyroscopeOrientation, GyroscopeOptions } from '@ionic-native/gyroscope/ngx';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';

import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-funcoes',
  templateUrl: './funcoes.page.html',
  styleUrls: ['./funcoes.page.scss'],
})
export class FuncoesPage implements OnInit {

  //Um gancho de ciclo de vida chamado após Angular inicializou
  // todas as propriedades ligadas a dados de uma diretiva. Defina um ngOnInit()método para lidar com 
  //quaisquer tarefas adicionais de inicialização.
  ngOnInit() {
    this.device();
    this.acelera(); //aceleraçao dispositivo
    this.watchLocation(); //Pega Location em Tempo Real
    this.Deteccao();
  }

  public accX: any;
  public accY: any;
  public accZ: any;

  public xOrient: any;
  public yOrient: any;
  public zOrient: any;
  public timestamp: any

  geoLatitude: number;
  geoLongitude: number;
  geoAccuracy: number;
  geoAddress: string;
  //speed: number;
  speed: any = [];

  watchLocationUpdates: any;
  loading: any;
  isWatching: boolean;

  //Geocoder configuration
  geoencoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };

  constructor(private deviceMotion: DeviceMotion, private gyroscope: Gyroscope,
    private nativeGeocoder: NativeGeocoder, private geolocation: Geolocation,
    public alertCtrl: AlertController) { }


  jaFoiAlerta = false;

  async Alerta() {

    if (!this.jaFoiAlerta) {

      const alert = await this.alertCtrl.create({
        header: 'Alerta',
        // subHeader: 'Subtitle',
        message: 'Você esta bem ? ',
        buttons: [
          {
            text: 'Não',
            handler: () => {
              this.SMSAcidente();
              console.log('Acidente');
            }
          },
          {
            text: 'Sim',
            handler: () => {
              console.log('Sim, estou bem ! ');

            }
          }
        ]

      });
      await alert.present();

      this.jaFoiAlerta = true;
    } else {
      console.log("não Enviar de novo!");
    }


  };


  //Obter a aceleração atual do dispositivo
  device() {
    this.deviceMotion.getCurrentAcceleration().then(
      (acceleration: DeviceMotionAccelerationData) => console.log(acceleration),
      (error: any) => console.log(error)
    );
  }

  // mostre a aceleração do dispositivo
  acelera() {

    let options = {
      frequency: 1000,
      enableHighAccuracy: true
    };


    var subscription = this.deviceMotion.watchAcceleration(options).subscribe((acceleration: DeviceMotionAccelerationData) => {
      console.log(acceleration);

      /*this.accX = acceleration.x;
      this.accY = acceleration.y;
      this.accZ = acceleration.z;
      */


      Math.round(this.accX = acceleration.x);
      Math.round(this.accY = acceleration.y);
      Math.round(this.accZ = acceleration.z);


      //if (this.accZ >= 9 && this.accZ <= 10)
      // alert('Velocidade >== 9 \nVeiculo Parado')

      //else
      //alert('Velocidade != 9 \n '+this.accZ)


    });
  }

  //=============================

  gyrascope() {

    let options: GyroscopeOptions = {
      frequency: 1000
    };

    this.gyroscope.getCurrent(options)
      .then((orientation: GyroscopeOrientation) => {
        console.log(orientation.x, orientation.y, orientation.z, orientation.timestamp);
        this.xOrient = orientation.x;
        this.yOrient = orientation.y;
        this.zOrient = orientation.z;
        this.timestamp = orientation.timestamp;

      })
      .catch()

    this.gyroscope.watch()
      .subscribe((orientation: GyroscopeOrientation) => {
        console.log(orientation.x, orientation.y, orientation.z, orientation.timestamp);
        this.xOrient = orientation.x;
        this.yOrient = orientation.y;
        this.zOrient = orientation.z;
        this.timestamp = orientation.timestamp;
      });
  }

  //============= Geocoder

  //Get current coordinates of device
  getGeolocation() {
    let options = {
      frequency: 1000,
      enableHighAccuracy: true
    };

    this.geolocation.getCurrentPosition({ enableHighAccuracy: true, timeout: 10000 }).then((resp) => {
      this.geoLatitude = resp.coords.latitude;
      this.geoLongitude = resp.coords.longitude;
      this.geoAccuracy = resp.coords.accuracy;
      //this.speed = resp.coords.speed;
      //this.speed = resp.coords.speed * 2.2369;
      //this.speed = (resp.coords.speed) * 3.6;
      this.speed = Math.round((resp.coords.speed * 3600) / 1000);
      //this.speed = (location.speed * 3600)/1000 
      //if(this.speed == 0)
      //alert('Velocidade == 0');
      //else
      //alert('Velocidade != 0');

      this.getGeoencoder(this.geoLatitude, this.geoLongitude);
    }).catch((error) => {
      alert('Error getting location' + JSON.stringify(error));
    });

    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude


    });
  }

  //geocoder method to fetch address from coordinates passed as arguments
  getGeoencoder(latitude, longitude) {
    this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoencoderOptions)
      .then((result: NativeGeocoderResult[]) => {
        this.geoAddress = this.generateAddress(result[0]);
      })
      .catch((error: any) => {
        alert('Error getting location' + JSON.stringify(error));
      });
  }

  //Return Comma saperated address
  generateAddress(addressObj) {
    let obj = [];
    let address = "";
    for (let key in addressObj) {
      obj.push(addressObj[key]);
    }
    obj.reverse();
    for (let val in obj) {
      if (obj[val].length)
        address += obj[val] + ', ';
    }
    return address.slice(0, -2);
  }

  // Calculando velocidade em tempo real
  //Start location update watch
  watchLocation() {
    this.isWatching = true;
    this.watchLocationUpdates = this.geolocation.watchPosition();
    this.watchLocationUpdates.subscribe((resp) => {
      this.geoLatitude = resp.coords.latitude;
      this.geoLongitude = resp.coords.longitude;
      //this.speed =  resp.coords.speed;
      this.speed = Math.round((resp.coords.speed * 3600) / 1000);


      // if (this.speed == 0)
      //alert('Velocidade == 0 \nVeiculo Parado')

      //else
      //alert('Velocidade != 0')


      this.getGeoencoder(this.geoLatitude, this.geoLongitude);
    });
  }

  //Stop location update watch
  stopLocationWatch() {
    this.isWatching = false;
    this.watchLocationUpdates.unsubscribe();
  }



  // Vereficacao de acidente

  Deteccao() {
    // atualiza acada 1 segundo
    let options = {
      frequency: 3000,
      enableHighAccuracy: true
    };

    // Chama o plugin DeviceMotion = aceleracao do dispositivo
    var subscription = this.deviceMotion.watchAcceleration(options).subscribe((acceleration: DeviceMotionAccelerationData) => {
      console.log(acceleration);

      // Chama o plugin Geolocation
      this.isWatching = true;
      this.watchLocationUpdates = this.geolocation.watchPosition();
      this.watchLocationUpdates.subscribe((resp) => {

        this.speed = Math.round((resp.coords.speed * 3600) / 1000); // calcula a velocidade

        this.accX = acceleration.x; //alpha
        this.accY = acceleration.y; //beta
        this.accZ = acceleration.z; //gamma


        // TELA VIRADA PARA CIMA Horizontal
        if (this.accY >= 0 && this.accY <= 1 &&
          this.accX >= 0 && this.accX <= 1 &&
          this.accZ >= 9 && this.accZ <= 10 &&
          this.speed >= 0 && this.speed <= 4)

          // this.Alerta();
          console.log('Parada normal');

        // TELA VIRADA PARA CIMA Horizontal, pegando a ultima velocidade do array ex: 80km/h agora 0km/h
        // A velocidade mínima é de 55 km/h em rodovias, velocidade máxima permitida é de 110 km/h
        if (this.accY >= 0 && this.accY <= 1 &&
          this.accX >= 0 && this.accX <= 1 &&
          this.accZ >= 9 && this.accZ <= 10 &&
          this.speed == 0 && this.speed <= 4 && this.speed.length - 1 > 55)

          this.Alerta();


        // TELA DE PE EM LINHA RETA = Vertical 
        if (this.accY >= 9  &&
          this.accX >= 0  &&
          this.accZ >= 0 &&
          this.speed == 0 && this.speed <= 4 && this.speed.length - 1 > 55 )

          this.Alerta();


        // Dispositivo deitado = Oeste 
        if (this.accY >= 0 && this.accY <= 1 &&
          this.accX >= 9 && this.accX <= 10 &&
          this.accZ >= 0 && this.accZ <= 1 && this.accZ <= -1 &&
          this.speed == 0 && this.speed <= 4 && this.speed.length - 1 > 55)

          this.Alerta();


        // Dispositivo deitado = Leste
        if (this.accY <= -0 || this.accY >= 0 &&
          this.accX <= -9 || this.accY >= -7 &&
          this.accZ >= 0 || this.accY >= -1 &&
          this.speed == 0 && this.speed <= 4 && this.speed.length - 1 > 55)

          this.Alerta();

        // Dispositivo deitado TELA PRA BAIXO VIRADA 
        if (this.accY >= 0 && this.accY <= 1 &&
          this.accX >= 9 && this.accX <= 10 &&
          this.accZ >= 0 && this.accZ <= 1 && this.accZ <= -1 &&
          this.speed == 0 && this.speed <= 4 && this.speed.length - 1 > 55)

          this.Alerta();

          

      });
    });

  }


  // Envia automaticamente um SMS para a lista cadastrada

  jaFoiSMS = false;

  SMSAcidente() {
    if (!this.jaFoiSMS) {
      alert('Acidente detectado \n\n Enviando SMS')

      this.jaFoiSMS = true;
    } else {
      console.log("não Enviar de novo!");
    }

  }








}




