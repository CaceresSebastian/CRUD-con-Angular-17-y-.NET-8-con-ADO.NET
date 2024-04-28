import { Component, Inject, ViewChild, inject, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {CommonModule} from '@angular/common';
import {Router } from '@angular/router';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { HijoService } from '../../Services/Hijo/hijo.service';
import { Hijo } from '../../Models/Hijo';
import { HijosFormComponent } from '../hijos-form/hijos-form.component';

@Component({
  selector: 'app-hijos',
  standalone: true,
  imports: [MatCardModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    MatDialogModule,
    MatPaginator,
  ],
  templateUrl: './hijos.component.html',
  styleUrl: './hijos.component.css'
}) 
export class HijosComponent implements OnInit{
  private hijoServicio = inject(HijoService);
  public listaHijos:Hijo[]=[];
  public displayedColumns:string[] = [
    'idHijo', 
    'nombreCompleto',
    'idTipoDoc', 
    'numeroDoc', 
    'fechaNac', 
    'Editar',
    'Eliminar',
  ];

  dialog = inject(MatDialog);
  dataSource:any;
  idPersonal: number;
  hayDatos:boolean = false;
  nombrePadre:string;
  // Paginación de la tabla
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // Inicializar la función de listado
  constructor(    
    private router:Router,
    @Inject(MAT_DIALOG_DATA) public data: any){

    this.obtenerHijos();
    this.idPersonal = data.id;
    this.nombrePadre = data.nombrePadre;
  }


  ngOnInit(): void {
    this.obtenerHijos();
  }


  //Obtener la lista de Personales
  obtenerHijos(){
    this.hijoServicio.lista(this.idPersonal).subscribe({ 
      next:(data)=>{
        if(data.length > 0){
          this.listaHijos = data;
          this.dataSource = new MatTableDataSource(this.listaHijos);
          this.dataSource.paginator = this.paginator;
          this.hayDatos = true;
        }else{
          this.listaHijos = data;
          this.dataSource = new MatTableDataSource(this.listaHijos);
          this.hayDatos = false;
        }
      },
      error:(err)=>{
        console.log(err.message);
      }
    });
  }

  // Eliminar personal de la Lista
  eliminar(objeto:Hijo){
    if(confirm("¿Desea eliminar al hijo " + objeto.nombreCompleto + "?")){
      this.hijoServicio.eliminar(objeto.idHijo).subscribe({
        next:(data)=>{
          if(data.isSuccess){
            console.log("se eliminó");
          }else{
            console.log("no se pudo eliminar", data);
          }
          this.obtenerHijos();
        },
        error:(err)=>{
          console.log(err.message);
        }
      });
    }
  }

  //Editar Hijo - Dialog
  openDialogEditar(objeto:Hijo){
    const dialogRef = this.dialog.open(HijosFormComponent, { data: { id: objeto.idHijo, Personal: this.idPersonal} });  
    this.closeDialog(dialogRef);
  }
  //Crear Hijo - Dialog
  openDialogCrear(){
    const dialogRef = this.dialog.open(HijosFormComponent, { data: { id: 0, Personal: this.idPersonal } });
    this.closeDialog(dialogRef);
  }

  closeDialog(dialogRef:any){
    dialogRef.afterClosed().subscribe(() => {
      this.obtenerHijos();
    });
  }

  //Input filtrado de palabras de la tabla
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
