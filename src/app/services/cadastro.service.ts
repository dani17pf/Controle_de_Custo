import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Cadastro } from '../dados/cadastro';
import { Abastecimentos } from '../dados/abastecimentos';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {
  private cadastroCollection: AngularFirestoreCollection<Cadastro>; // acessando uma coleção "tabela"<cadastro>
  private abastecimentosCollection: AngularFirestoreCollection<Abastecimentos>;

  constructor(private afs: AngularFirestore) {


    var user = firebase.auth().currentUser.uid;
    console.log(user," usuario");

    this.cadastroCollection = this.afs.collection<Cadastro>('veiculos',
     ref => ref.where('userId', '==', user));



    


  }

  getCadastros() {
    return this.cadastroCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data };
        });
      })
    );
  }

  addCadastro(cadastro: Cadastro) {
    return this.cadastroCollection.add(cadastro);
  }

  getCadastro(id: string) {
    return this.cadastroCollection.doc<Cadastro>(id).valueChanges();
  }

  updateCadastro(id: string, cadastro: Cadastro) {
    return this.cadastroCollection.doc<Cadastro>(id).update(cadastro);
  }

  deleteCadastro(id: string) {
    return this.cadastroCollection.doc(id).delete();
  }

}

