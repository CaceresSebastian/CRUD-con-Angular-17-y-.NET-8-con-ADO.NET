import { Component, ViewChild, inject } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {CommonModule} from '@angular/common';
import {Router } from '@angular/router';
import { PersonalService } from '../../Services/Personal/personal.service';
import { Personal } from '../../Models/Personal';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { PersonalFormComponent } from '../../Components/personal-form/personal-form.component';
import { MatPaginator } from '@angular/material/paginator';
import { HijosComponent } from '../../Components/hijos/hijos.component';

@Component({
  selector: 'app-trabajadores',
  standalone: true,
  imports: [MatCardModule,
      MatTableModule,
      MatIconModule,
      MatButtonModule,
      MatInputModule,
      MatFormFieldModule,
      CommonModule,
      MatDialogModule,
      PersonalFormComponent,
      MatPaginator,
    ],
  templateUrl: './trabajadores.component.html',
  styleUrl: './trabajadores.component.css'
})

export class TrabajadoresComponent {
  private personalServicio = inject(PersonalService);
  public listaPersonal:Personal[]=[];
  public displayedColumns:string[] = [
    'idPersonal', 
    'nombreCompleto', 
    'idTipoDoc', 
    'numeroDoc', 
    'fechaNac',
    'fechaIngreso',
    'Editar',
    'Eliminar', 
    'VerHijos'
  ];

  dialog = inject(MatDialog);
  dataSource:any;
  hayDatos:boolean = false;
  // Paginación de la tabla
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // Inicializar la función de listado
  constructor(private router:Router){
    this.obtenerPersonales();
  }

  //Obtener la lista de Personales
  obtenerPersonales(){
    this.personalServicio.lista().subscribe({
      next:(data)=>{
        console.log("llamando");
        if(data.length > 0){
          this.listaPersonal = data;
          this.dataSource = new MatTableDataSource(this.listaPersonal);
          this.dataSource.paginator = this.paginator;
          this.hayDatos=true;
        }else{
          this.listaPersonal = data;
          this.dataSource = new MatTableDataSource(this.listaPersonal);
          this.hayDatos=false;
        }
      },
      error:(err)=>{
        console.log(err.message);
      }
    });
  }

  // Eliminar personal de la Lista
  eliminar(objeto:Personal){
    if(confirm("¿Desea eliminar del personal a " + objeto.nombreCompleto + "?")){
      this.personalServicio.eliminar(objeto.idPersonal).subscribe({
        next:(data)=>{

          if(data.isSuccess){
            console.log("se eliminó")
            this.obtenerPersonales();
          }else{
            console.log("no se pudo eliminar", data);
            this.obtenerPersonales();
          }
        },
        error:(err)=>{
          console.log(err.message);
        }
      });
    }
  }

  //Editar personal - Dialog
  openDialogEditar(objeto:Personal){
    const dialogRef = this.dialog.open(PersonalFormComponent, { data: { id: objeto.idPersonal } });  
    this.closeDialog(dialogRef);
  }
  //Crear Usuario - Dialog
  openDialogCrear(){
    const dialogRef = this.dialog.open(PersonalFormComponent, { data: { id: 0 } });
    this.closeDialog(dialogRef);
  }
  //Abrir Hijos usuarios
  openDialogListaHijos(objeto:Personal){
    const dialogRef = this.dialog.open(HijosComponent, { data: { id: objeto.idPersonal,nombrePadre: objeto.nombreCompleto }});
    this.closeDialog(dialogRef);
  }

  closeDialog(dialogRef:any){
    dialogRef.afterClosed().subscribe(() => {
      this.obtenerPersonales();
    });
  }

  //Input filtrado de palabras de la tabla
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
