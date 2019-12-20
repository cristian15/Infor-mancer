import { Routes, RouterModule } from "@angular/router";
import { PerfilComponent } from './components/perfil/perfil.component';
import { AuthGuardService } from './services/auth-guard.service';
import { LoginComponent } from './components/login/login.component';
import { RecuperaPassComponent } from './components/recupera-pass/recupera-pass.component';
import { RegistroComponent } from './components/registro/registro.component';
import { TwoFactorConfigComponent } from './components/two-factor-config/two-factor-config.component';
import { UsuariosAdminComponent } from './components/usuarios-admin/usuarios-admin.component';
import { AdminGuardService } from './services/admin-guard.service';

const usuarioRouting: Routes = [
        {
            path: 'perfil',
            component: PerfilComponent,
            canActivate: [AuthGuardService],
            data: { title: 'Perfil' }
        },
        {
            path: 'login',
            component: LoginComponent,
            data: { title: 'Login' }
        },
        {
            path: 'registrar',
            component: RegistroComponent,
            data: { title: 'Registrar' }
        },
        {
            path: 'recupera',
            component: RecuperaPassComponent,
            data: { title: 'Recuperar Contraseña' }
        },
        {
            path: 'configuracion_dos_factores',
            component: TwoFactorConfigComponent,
            canActivate: [AuthGuardService],
            data: { title: 'Autenticacion de 2 Factores'}
        },
        {
            path: 'usuarios-admin',
            component: UsuariosAdminComponent,
            canActivate: [
                AuthGuardService            // Bloquea la ruta si el usuario no esta logueado
                , AdminGuardService],       // Bloquea la ruta si el usuario no es administrador
            data: { title: 'Administrador de Usuarios'}
        }
        
];


export const USER_ROUTES = RouterModule.forChild( usuarioRouting );