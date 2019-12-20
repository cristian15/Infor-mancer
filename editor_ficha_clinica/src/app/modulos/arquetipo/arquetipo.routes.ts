import { Routes, RouterModule } from "@angular/router";
import { AuthGuardService } from '../usuario/services/auth-guard.service';
import { ImportaArquetipoComponent } from './components/importa-arquetipo/importa-arquetipo.component';
import { ListaArquetiposComponent } from './components/lista-arquetipos/lista-arquetipos.component';

const arquetipoRouting: Routes = [
        {
            path: 'importar',
            component: ImportaArquetipoComponent,
            canActivate: [AuthGuardService],
            data: { title: 'Importa Arquetipo' }
        },
        {
            path: 'arquetipos',
            component: ListaArquetiposComponent,
            canActivate: [AuthGuardService],
            data: { title: 'Arquetipos' }
        },
];


export const ARQUETIPO_ROUTES = RouterModule.forChild( arquetipoRouting );      // exporta las rutas