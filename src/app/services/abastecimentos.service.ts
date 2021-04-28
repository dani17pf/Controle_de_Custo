import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Abastecimentos } from '../dados/abastecimentos';
import { map } from 'rxjs/operators';
import { Cadastro } from '../dados/cadastro';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AbastecimentosService {
  private abastecimentosCollection: AngularFirestoreCollection<Abastecimentos>; // acessando uma coleção "tabela"<cadastro>
  private cadastroCollection: AngularFirestoreCollection<Cadastro>;
  constructor(private afs: AngularFirestore) {
    //this.abastecimentosCollection = this.afs.collection<Abastecimentos>('Abastecimentos');

    
    var user = firebase.auth().currentUser.uid;
    console.log(user," usuario");

    this.abastecimentosCollection = this.afs.collection<Abastecimentos>('Abastecimentos',
     ref => ref.where('userId', '==', user));

  }



  getAbastecimentos() {
    return this.abastecimentosCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data };
        });
      })
    );
  }

  addAbastecimento(abastecimentos: Abastecimentos) {
    return this.abastecimentosCollection.add(abastecimentos);
  }

  getAbastecimento(id: string) {
    return this.abastecimentosCollection.doc<Abastecimentos>(id).valueChanges();
  }

  updateAbastecimento(id: string, abastecimentos: Abastecimentos) {
    return this.abastecimentosCollection.doc<Abastecimentos>(id).update(abastecimentos);
  }

  deleteAbastecimento(id: string) {
    return this.abastecimentosCollection.doc(id).delete();
  }

}

