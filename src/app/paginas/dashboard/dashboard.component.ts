import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { getAuth } from "firebase/auth";
import { CommonModule } from '@angular/common';
import { Item } from '../item';
import { CadastroService } from './cadastro.service';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  itens: Item[] = []
  // public id: string = ''

  public isLoadUpload: boolean = false;
  private foto: string = ""

  constructor(
    private router: Router,
    private cadastroService: CadastroService,
    private auth: AngularFireAuth,
    private autenticar: AuthService,
  ) { }

  public item: Item = {
    id: "",
    idUsuario: "",
    produto: "",
    preco: "",
    descricao: "",
  }

  public variavel!: ""

  public salvarItem(formulario: NgForm): void {
    const gauth = getAuth()
    if (formulario.valid) {
      this.item.foto = this.foto
      this.item.idUsuario = gauth.currentUser?.uid as string
      this.cadastroService.criarItem(this.item).subscribe(retorno => {
        this.variavel = retorno.id
        console.log("Item cadastrada com sucesso!");
        this.registrarIdTarefa()
        this.router.navigate(["dashboard"])

      });
    } else {
      console.log("É obrigatório o preenchimento do nome da obra e episódio para realizar o salvamento!");
    }
  }

  public registrarIdTarefa() {
    this.item.id = this.variavel as string
    this.cadastroService.atualizarItem(this.item).subscribe(retorno => {

    })
  }

  public uploadFile(event: any): void {
    this.isLoadUpload = true;
    const file: File = event.target.files[0];
    this.cadastroService.uploadFoto(file).subscribe(uploadResult => {
      this.isLoadUpload = false;
      const storageReference = uploadResult.ref;
      const promiseFileUrl = storageReference.getDownloadURL();
      promiseFileUrl.then((foto: string) => {
        this.foto = foto;
      })
    });
  }

  public deslogar() {
    this.router.navigate(["home"])
    this.autenticar.sair().subscribe(retorna=>{
      console.log("Volte Sempre!")
    })
  }

  ngOnInit(): void {
    this.initializeTable()
  }

    public initializeTable(): void {
    const gauth = getAuth();
    this.cadastroService.buscarTodosItens(gauth.currentUser?.uid as string).subscribe(retorno => {
      this.itens = retorno;
    });
  }

}
