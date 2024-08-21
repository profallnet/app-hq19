import { Routes } from '@angular/router';
import { LoginComponent } from './paginas/login/login.component';
import { HomeComponent } from './paginas/home/home.component';
import { verificationGuard } from './paginas/verification.guard';
import { DashboardComponent } from './paginas/dashboard/dashboard.component';
import { EditarComponent } from './paginas/editar/editar.component';

export const routes: Routes = [

    {
        path: 'login',
        component: LoginComponent,
        
    },
    {
        path: 'home',
        component: HomeComponent,
    },    {
        path: 'dashboard',
        component: DashboardComponent,
    },
        {
        path: 'editar/:id',
        component: EditarComponent,
        // canActivate: [verificationGuard]
    }

];
    
