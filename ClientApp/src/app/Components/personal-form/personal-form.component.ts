import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, DateAdapter } from '@angular/material/core';
import { PersonalService } from '../../Services/Personal/personal.service';
import { Router } from '@angular/router';
import { Personal } from '../../Models/Personal';

import {provideNativeDateAdapter} from '@angular/material/core';

@Component({
  selector: 'app-personal-form',
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
  templateUrl: './personal-form.component.html',
  styleUrl: './personal-form.component.css'
})

export class PersonalFormComponent implements OnInit{
 
  idPersonal: number;

  constructor(
    private dateAdapter: DateAdapter<any>, 
    public dialogRef: MatDialogRef<PersonalFormComponent>, 
    private router:Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){
    this.idPersonal = data.id;
  }

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
    if(this.idPersonal != 0){
      this.personalServicio.obtener(this.idPersonal).subscribe({
        next:(data) => {
          this.formPersonal.patchValue({
            idTipoDoc: String(data.idTipoDoc),
            numeroDoc: data.numeroDoc,
            apPaterno: data.apPaterno,
            apMaterno: data.apMaterno,
            nombre1: data.nombre1,
            nombre2: data.nombre2,
            fechaNac: this.regresarFecha(data.fechaNac),
            fechaIngreso: this.regresarFecha(data.fechaIngreso),
          })
        },
        error:(err)=>{
          console.log(err.message)
        }
      });
    }
  }

  private personalServicio = inject(PersonalService);
  public fromBuild = inject(FormBuilder);

  public formPersonal:FormGroup = this.fromBuild.group({
    idTipoDoc: [],
    numeroDoc: [''],
    apPaterno: [''],
    apMaterno: [''],
    nombre1: [''],
    nombre2: [''],
    fechaNac: [''],
    fechaIngreso: [''],
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
    const objeto:Personal={
      idPersonal: this.idPersonal,
      idTipoDoc: Number(this.formPersonal.value.idTipoDoc),
      numeroDoc: this.formPersonal.value.numeroDoc,
      apPaterno: this.formPersonal.value.apPaterno,
      apMaterno: this.formPersonal.value.apMaterno,
      nombre1: this.formPersonal.value.nombre1,
      nombre2: this.formPersonal.value.nombre2,
      nombreCompleto: '',
      fechaNac: this.formatearFecha(this.formPersonal.value.fechaNac),
      fechaIngreso: this.formatearFecha(this.formPersonal.value.fechaIngreso),
    };

    const servicio = this.idPersonal === 0 ? 
          this.personalServicio.crear(objeto) : 
          this.personalServicio.editar(objeto);

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
