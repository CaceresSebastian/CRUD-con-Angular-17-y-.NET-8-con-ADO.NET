import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, DateAdapter } from '@angular/material/core';
import { Router } from '@angular/router';
import { HijoService } from '../../Services/Hijo/hijo.service';
import { Hijo } from '../../Models/Hijo';

import {provideNativeDateAdapter} from '@angular/material/core';

@Component({
  selector: 'app-hijos-form',
  standalone: true,
  imports: [
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatNativeDateModule 
  ],
  providers: [  
    MatDatepickerModule,  
    provideNativeDateAdapter(),
  ],
  templateUrl: './hijos-form.component.html',
  styleUrl: './hijos-form.component.css'
})
export class HijosFormComponent implements OnInit{



  constructor(
    private dateAdapter: DateAdapter<any>, 
    public dialogRef: MatDialogRef<HijosFormComponent>, 
    private router:Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){
    this.idHijo = data.id;
    this.idPersonal = data.Personal;
  }
  idPersonal: number;
  idHijo: number;

  regresarFecha(fecha:string):any{
    const partes = fecha.split(' ');
    const day = parseInt(partes[0].split('/')[0]);
    const month = parseInt(partes[0].split('/')[1])-1;
    const year = parseInt(partes[0].split('/')[2]);

    const hora = parseInt(partes[1].split(':')[0]);
    const minutos = parseInt(partes[1].split(':')[1]);
    const segundos = parseInt(partes[1].split(':')[2]);
    return new Date(year, month, day, hora, minutos,segundos);
  }

  ngOnInit(): void {
    if(this.idHijo != 0){
      this.hijoServicio.obtener(this.idHijo).subscribe({
        next:(data) => {
          this.formHijo.patchValue({
            idTipoDoc: String(data.idTipoDoc),
            numeroDoc: data.numeroDoc,
            apPaterno: data.apPaterno,
            apMaterno: data.apMaterno,
            nombre1: data.nombre1,
            nombre2: data.nombre2,
            fechaNac: this.regresarFecha(data.fechaNac),
          })
        },
        error:(err)=>{
          console.log(err.message)
        }
      });
    }
  }

  private hijoServicio = inject(HijoService);
  public fromBuild = inject(FormBuilder);

  public formHijo:FormGroup = this.fromBuild.group({
    idTipoDoc: [],
    numeroDoc: [''],
    apPaterno: [''],
    apMaterno: [''],
    nombre1: [''],
    nombre2: [''],
    fechaNac: [''],
  });

  formatearFecha(fechaSinFormatear:string): string{
      const fecha = new Date(fechaSinFormatear)
      const year = fecha.getFullYear();
      const month = (fecha.getMonth() + 1).toString().padStart(2, '0');
      const day = fecha.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
  }

  //Guardar los datos del formulario
  guardar(): void{
    const objeto:Hijo={
      idHijo: this.idHijo,
      idPersonal: this.idPersonal,
      idTipoDoc: Number(this.formHijo.value.idTipoDoc),
      numeroDoc: this.formHijo.value.numeroDoc,
      apPaterno: this.formHijo.value.apPaterno,
      apMaterno: this.formHijo.value.apMaterno,
      nombre1: this.formHijo.value.nombre1,
      nombre2: this.formHijo.value.nombre2,
      nombreCompleto: '',
      fechaNac: this.formatearFecha(this.formHijo.value.fechaNac),
    };

    const servicio = this.idHijo === 0 ? 
          this.hijoServicio.crear(objeto) : 
          this.hijoServicio.editar(objeto);

    servicio.subscribe({
      next:(data) => {
        if(data.isSuccess){
          console.log("Se guardó correctamente");
          this.cerrarDialog();
        }else{
          console.log("Hubo un error al guardar");
          this.cerrarDialog();
        }
      },
      error:(err)=>{
        console.log(err.message)
      }
    });
  }

  //Cerrar la ventana de Dialog
  cerrarDialog(){
    this.dialogRef.close();
  }
}
