import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { User } from './user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public formulario!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) { 
    this.formulario = fb.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required]]
    })

  }

  public logarEmailSenha(): void {
    if(this.formulario.valid) {
      const user: User = this.formulario.value
      this.authService.autenticarEmailSenha(user).subscribe(credencial => {
      console.log("Autenticado com Email e Senha!")
      this.router.navigate(["home"])
      })
    } else {
      console.log("Dados inválidos")
    }
  }

}
