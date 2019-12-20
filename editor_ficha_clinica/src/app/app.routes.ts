import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from './modulos/usuario/services/auth-guard.service';
import { LoginComponent } from './modulos/usuario/components/login/login.component';
import { InicioComponent } from './inicio/inicio.component';

const routes: Routes = [
    { path: '', component: InicioComponent , canActivate: [AuthGuardService] },
    { path: 'login', component: LoginComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);