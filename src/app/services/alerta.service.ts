import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Alerta } from '../dados/alerta';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AlertaService {

  private alertaCollection: AngularFirestoreCollection<Alerta>; // acessando uma coleção "tabela"<Alerta>

  constructor(private afs: AngularFirestore) { 
    //this.alertaCollection = this.afs.collection<Alerta>('alerta');

    var user = firebase.auth().currentUser.uid;
    console.log(user," usuario");

    this.alertaCollection = this.afs.collection<Alerta>('alerta',
     ref => ref.where('userId', '==', user));
  }

  getAlertas() {
    return this.alertaCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data };
        });
      })
    );
  }

  addAlerta(alerta: Alerta) {
    return this.alertaCollection.add(alerta);
  }

  getAlerta(id: string) {
    return this.alertaCollection.doc<Alerta>(id).valueChanges();
  }

  updateAlerta(id: string, alerta: Alerta) {
    return this.alertaCollection.doc<Alerta>(id).update(alerta);
  }

  deleteAlerta(id: string) {
    return this.alertaCollection.doc(id).delete();
  }


}
