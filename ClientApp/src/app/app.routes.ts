import { Routes } from '@angular/router';
import { InicioComponent } from './Pages/inicio/inicio.component';
import { TrabajadoresComponent } from './Pages/trabajadores/trabajadores.component';


export const routes: Routes = [
    {path: '', component:InicioComponent},
    {path: 'inicio', component:InicioComponent},

    {path: 'Personal', component:TrabajadoresComponent},
];
