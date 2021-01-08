import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';

declare var google;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage  {

  
  @ViewChild('map', {static : false}) mapElement: ElementRef;
  map : any;

  address: string;

  latitude: number;
  longitude: number;

 // public latitude: any;
  //public longitude: any; 
  public  speed: any; 
  zone: any;
  

  constructor(private geolocation : Geolocation,private nativeGeocoder: NativeGeocoder) {
     // this.getLocal();
      this.loadMap();

   }

   


   /* loadMap(){
    this.geolocation.getCurrentPosition().then((resp) => {

        let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
        let mapOption = {center : latLng, //opções para criar o mapa
                          zoom: 15,
                          mapTypeId: google.maps.MapTypeId.ROADMAP,
                          disabledZoomDoubleClick: true,
                          fullscreenControl: true}
                          //cria mapa

        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOption);
        //this.map = new google.maps.Map(document.getElementById('map'), mapOption); //adicionando mapa com as opçoes

        let marker = new google.maps.Marker({ //Adicionando marcador
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: latLng,
        draggable: true,

      });
      
    }).catch((error)=> {
      console.log("Erro ao tentar buscar localização", error)
    });
   } 



   getLocal(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      this.speed = resp.coords.speed;

      //this.latitude = location.latitude;
        //this.longitude = location.longitude;
        //this.speed = (location.speed * 3600)/1000 ;
       //this.speed = Number.isNaN(location.speed * 3.6) ? 0 : (location.speed * 3.6);
      

      console.log("Posicao inicial: "+ this.latitude+ " | " + this.longitude);
      console.log("speed: "+ this.speed);

   
      
      resp.coords.latitude
      resp.coords.longitude
      resp.coords.speed
     }).catch((error) => {
       console.log('Error getting location', error);
     });
     
     let watch = this.geolocation.watchPosition();
     watch.subscribe((data) => {
     // dados podem ser um conjunto de coordenadas ou um erro (se ocorreu um erro).
       data.coords.latitude
       data.coords.longitude

      console.log("Posicao atualizada: "  + data.coords.latitude + " | " + data.coords.longitude);

     });
   }

   

  ngOnInit() {
  }

  startTracking() {
    /*this.deviceMotion.getCurrentAcceleration().then(
      (acceleration: DeviceMotionAccelerationData) => //console.log(acceleration)
      this.x=0,
      (error: any) => console.log(error)
    );
    var subscription = this.deviceMotion.watchAcceleration().subscribe((acceleration: DeviceMotionAccelerationData) => {
      //console.log(acceleration);
    });
 =========================================aqui
    let config = {
      desiredAccuracy: 0,
      stationaryRadius: 5,
      distanceFilter: 10,
      debug: true,
      interval: 1000
    };






  } 

} */

loadMap() {
  this.geolocation.getCurrentPosition().then((resp) => {

    this.latitude = resp.coords.latitude;
    this.longitude = resp.coords.longitude;

    let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude);

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    this.map.addListener('dragend', () => {

      this.latitude = this.map.center.lat();
      this.longitude = this.map.center.lng();

      this.getAddressFromCoords(this.map.center.lat(), this.map.center.lng())
    });

  }).catch((error) => {
    console.log('Error getting location', error);
  });
}

getAddressFromCoords(lattitude, longitude) {
  console.log("getAddressFromCoords " + lattitude + " " + longitude);
  let options: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };

  this.nativeGeocoder.reverseGeocode(lattitude, longitude, options)
    .then((result: NativeGeocoderResult[]) => {
      this.address = "";
      let responseAddress = [];
      for (let [key, value] of Object.entries(result[0])) {
        if (value.length > 0)
          responseAddress.push(value);

      }
      responseAddress.reverse();
      for (let value of responseAddress) {
        this.address += value + ", ";
      }
      this.address = this.address.slice(0, -2);
    })
    .catch((error: any) => {
      this.address = "Address Not Available!";
    });

}

}

