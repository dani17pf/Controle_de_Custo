import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Cadastro } from '../dados/cadastro';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {
  private cadastroCollection: AngularFirestoreCollection<Cadastro>; // acessando uma coleção "tabela"<cadastro>

  constructor(private afs: AngularFirestore) {
    this.cadastroCollection = this.afs.collection<Cadastro>('Cadastro');
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

