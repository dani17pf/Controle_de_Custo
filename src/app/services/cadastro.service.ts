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

    this.cadastroCollection = this.afs.collection<Cadastro>('veiculos');

    //Se você adicionar um campo em cada documento que contém o usuário, poderá obter todos os documentos associados a esse usuário com:
    //firebase.firestore().collection('veiculos').where('uid', '=', firebase.auth().currentUser.uid).get();

    //Se você usar o UID do usuário como o ID do documento, poderá obter o documento de um usuário com:
    //firebase.firestore().collection('veiculos').doc(firebase.auth().currentUser.uid).collection('abastecimentos');

    //Se você armazenar os documentos de um usuário em uma subcoleção de um documento
    //com o nome do usuário, poderá obter essa coleção com:
    //firebase.firestore().collection('veiculos').doc(firebase.auth().currentUser.uid).collection('documents')
    

   //s teste   firebase.firestore().collection('veiculos').doc('tWLlmFtwVLNLOe0MinvCimFy9ID2').collection('abastecimentos');
    firebase.firestore().collection('veiculos').get()
        .then(function(snapshot) {
            console.log('SNAPSHOT', snapshot);
            snapshot.forEach(function(doc) {
                console.log(doc.exists);
                console.log(doc);
                console.log(doc.id);
                console.log(doc.metadata);
                console.log(doc.ref);
                console.log(doc.data());
                console.log(doc.ref.path); //pego id doc
                console.log(doc);
            })
        }).catch(console.log);

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

