import { Component, inject } from '@angular/core';

import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

import { PersonalService } from '../../Services/Personal/personal.service';
import { Personal } from '../../Models/Personal';
import {Router } from '@angular/router';

@Component({
  selector: 'app-trabajadores',
  standalone: true,
  imports: [MatCardModule, MatTableModule, MatIconModule, MatButtonModule,MatInputModule,MatFormFieldModule],
  templateUrl: './trabajadores.component.html',
  styleUrl: './trabajadores.component.css'
})
export class TrabajadoresComponent {
  private personalServicio = inject(PersonalService);
  public listaPersonal:Personal[]=[];
  public displayedColumns:string[] = ['Nro', 'NombresCompletos', 'TDocumento', 'NroDocumento'
  , 'FNacimiento','FIngreso','Editar','Eliminar', 'VerHijos'];

  obtenerPersonales(){
    this.personalServicio.lista().subscribe({
      next:(data)=>{
        if(data.length > 0){
          this.listaPersonal = data;
        }
      },
      error:(err)=>{
        console.log(err.message)
      }
    });
  }

  constructor(private router:Router){
    this.obtenerPersonales();
  }

  nuevo(){
    this.router.navigate(['/Personal',0]);
  }

  editar(objeto:Personal){
    this.router.navigate(['/Personal', objeto.IdPersonal]);
  }

  eliminar(objeto:Personal){
    if(confirm("Desea eliminar el personal " + objeto.NombreCompleto)){
      this.personalServicio.eliminar(objeto.IdPersonal).subscribe({
        next:(data)=>{
          if(data.isSuccess){
            this.obtenerPersonales();
          }
        },
        error:(err)=>{
          console.log("No se pudo eliminar el personal")
        }
      });
    }
  }
}
