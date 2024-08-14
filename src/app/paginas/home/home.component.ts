import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }
  public sair(): void {
    this.router.navigate(["login"])
    this.authService.sair().subscribe(retorno => {
      console.log("Até logo!");
    })
  }

    public pedido = ["lanche"];
    public valor = "";
    public endereco = "";
    public telefone = "5512983172236";
   

  enviarPedido() {
    const mensagem = ` Olá! Gostaria de fazer o pedide de um ${this.pedido} no valor de ${this.valor} para o endereço ${this.endereco}.`;
    
    const mensagemCodificada = encodeURIComponent(mensagem);
    return`https://wa.me/${this.telefone}?text=${mensagemCodificada}` 
    
  }


}
