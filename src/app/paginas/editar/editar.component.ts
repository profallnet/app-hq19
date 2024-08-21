import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { getAuth } from "firebase/auth";
import { CommonModule } from '@angular/common';
import { Item } from '../item';
import { CadastroService } from '../dashboard/cadastro.service';

@Component({
  selector: 'app-editar',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.css'
})
export class EditarComponent {

  // itens: Item[] = []

  public item: Item = {
    id: "",
    idUsuario: "",
    produto: "",
    preco: "",
    descricao: "",
  }

  constructor(
    private cadastreService: CadastroService,
    private router: Router,
    private route: ActivatedRoute,
    private auth: AngularFireAuth
  ) { }

  ngOnInit(): void {
    this.InicializeCampos();
  }

  private InicializeCampos(): void {
    this.auth.user.subscribe((User) => {
      // this.gauth = this.gauth as string
      const id = this.route.snapshot.params["id"];
      this.cadastreService.buscarItemPorId(id).subscribe((retorno) => {
        this.item = retorno
        console.log(this.item.preco)
      })
    })
  }

  public atualizarItem(form: NgForm): void {
    const gauth = getAuth()
    if (form.valid) {
      this.item.idUsuario = gauth.currentUser?.uid as string
        this.cadastreService.atualizarItem(this.item).subscribe(retorno => {
          console.log("Atualizado com sucesso.");
          this.router.navigate(["dashboard"]);
        });
    }
    else {
      console.log("Dados inválidos.");
    }
  }
  
  public uploadFile(event: any): void {
    const file: File = event.target.files[0];
    this.cadastreService.uploadFoto(file).subscribe(uploadResult => {
      const storageReference = uploadResult.ref;
      const promiseFileUrl = storageReference.getDownloadURL();
      promiseFileUrl.then((fotoUrl: string) => {
        this.item.foto = fotoUrl;
      })
    });
  }

  public apagarItem() {
    this.auth.user.subscribe(User => {
      const id = this.route.snapshot.params["id"];
      this.cadastreService.apagarItem(id).subscribe((retorno) => {
        console.log("Marcação apagada com sucesso.");
        this.router.navigate(["dashboard"]);
      })
    })
  }
}
