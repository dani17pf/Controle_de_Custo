import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Manutencao } from '../dados/manutencao';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class ManutencaoService {
  private manutencaoCollection: AngularFirestoreCollection<Manutencao>; // acessando uma coleção "tabela"<Manutencao>

  constructor(private afs: AngularFirestore) { 
   // this.manutencaoCollection = this.afs.collection<Manutencao>('manutencao');

    var user = firebase.auth().currentUser.uid;
    console.log(user," usuario");

    this.manutencaoCollection = this.afs.collection<Manutencao>('manutencao',
     ref => ref.where('userId', '==', user));

  }

  getManutencoes() {
    return this.manutencaoCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data };
        });
      })
    );
  }

  addManutencao(manutencao: Manutencao) {
    return this.manutencaoCollection.add(manutencao);
  }

  getManutencao(id: string) {
    return this.manutencaoCollection.doc<Manutencao>(id).valueChanges();
  }

  updateManutencao(id: string, manutencao: Manutencao) {
    return this.manutencaoCollection.doc<Manutencao>(id).update(manutencao);
  }

  deleteManutencao(id: string) {
    return this.manutencaoCollection.doc(id).delete();
  }


}
