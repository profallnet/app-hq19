import { Routes } from '@angular/router';
import { LoginComponent } from './paginas/login/login.component';
import { HomeComponent } from './paginas/home/home.component';
import { verificationGuard } from './paginas/verification.guard';

export const routes: Routes = [

    {
        path: 'login',
        component: LoginComponent,
        
    },
    {
        path: 'home',
        component: HomeComponent,
    },

];
    
