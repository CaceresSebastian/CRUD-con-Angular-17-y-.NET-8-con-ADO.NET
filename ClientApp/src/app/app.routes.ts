import { Routes } from '@angular/router';
import { InicioComponent } from './Pages/inicio/inicio.component';
import { TrabajadoresComponent } from './Pages/trabajadores/trabajadores.component';
import { HijosComponent } from './Pages/hijos/hijos.component';

export const routes: Routes = [
    {path: '', component:TrabajadoresComponent}, //InicioComponent
    {path: 'inicio', component:InicioComponent},
    {path: 'Personal', component:TrabajadoresComponent},
    {path: 'Hijos/Lista/:id', component:HijosComponent},
];
