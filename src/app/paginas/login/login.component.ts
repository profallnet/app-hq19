import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

    public entrarComGoogle(): void {
      this.authService.autenticarGoogle().subscribe(credencial => {
        this.router.navigate(["home"])
        console.log("Login realizado com sucesso")
      })
    }

}
