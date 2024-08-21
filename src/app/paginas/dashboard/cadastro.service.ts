import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { catchError, EMPTY, from, map, Observable } from 'rxjs';
import { Item } from '../item'

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
  ) { }

  public item!: Item

  public criarItem(item: Item): Observable <any> {
    const promessa = this.firestore.collection("itens").add(item);
    return from(promessa).pipe(
      catchError(erro => {
        console.log("Erro ao cadastrar item.");
        console.error(erro);
        return EMPTY;
      })
    )
  }

  public uploadFoto(foto: File): Observable<any> {
    const promise = this.storage.upload(`fotos/${Date.now()}`, foto);
    return from(promise).pipe(
      catchError(error => {
        console.log("Erro no envio da imagem.");
        console.error(error);
        return EMPTY;
      })
    );
  }

  public atualizarItem(item: Item) {
    const promise = this.firestore.collection("itens").doc(item.id).update(item);
    return from(promise).pipe(
      catchError(error => {
        console.log("Erro ao atualizar item!");
        console.error(error);
        return EMPTY;
      })
    );
  }

  public buscarTodosItens(uidUser: string): Observable<any> {
    const promise = this.firestore.collection("itens",ref => ref.where('idUsuario', '==', uidUser)).get();
    return from(promise).pipe(
      map((response: any) => {
        return response.docs.map((doc: any) => {
          const itens: Item = doc.data() as Item;
          itens.idUsuario = doc.id;
          return itens;
        })
      }),
      catchError(error => {
        confirm("Erro ao buscar dados dos itens.");
        console.error(error);
        return EMPTY;
      })
    );
  }

  public buscarItemPorId(id: string):Observable<any> {
    const promise = this.firestore.collection("itens").doc(id).get();
    return from(promise).pipe(
      map(doc => {
        const item: Item = doc.data() as Item;
        item.idUsuario = doc.id
        return item;
      }),
      catchError(error => {
        console.log("Erro ao buscar item por id");
        console.error(error);
        return EMPTY;
      })
    )
  }

  public apagarItem(id: string) {
    const promise =  this.firestore.collection("itens").doc(id).delete();
    return from(promise).pipe(
      catchError(error => {
        console.log("Erro ao excluir.");
        console.error(error);
        return EMPTY;
      })
    );
  }
  
}

