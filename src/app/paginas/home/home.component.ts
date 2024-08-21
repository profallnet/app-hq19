import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Item } from '../item';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(
    private firestore: AngularFirestore
  ) { }

  itens: Item[] = []
  
  ngOnInit(): void {
    this.initializeTable()
  }



  public initializeTable(): void {
    this.firestore.collection<Item>('itens').valueChanges().subscribe((retorno) => {
      this.itens = retorno;
    });
  }











  // enviarPedido() {
  //   const mensagem = ` Olá! Gostaria de fazer o pedide de um ${this.pedido} no valor de ${this.valor} para o endereço ${this.endereco}.`;
    
  //   const mensagemCodificada = encodeURIComponent(mensagem);
  //   return`https://wa.me/${this.telefone}?text=${mensagemCodificada}` 
    
  // }


}
