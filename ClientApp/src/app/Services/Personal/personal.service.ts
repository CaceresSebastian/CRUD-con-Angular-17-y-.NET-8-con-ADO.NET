import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { appsettings } from '../../Settings/appsettings';
import { Personal } from '../../Models/Personal';
import { RespuestaAPI } from '../../Models/RespuestaAPI';

@Injectable({
  providedIn: 'root'
})
export class PersonalService {

  private http = inject(HttpClient);
  private apiUrl:string = appsettings.apiUrl + "Personal";

  constructor() { }

  lista(){
    return this.http.get<Personal[]>(this.apiUrl);
  }

  obtener(id:number){
    return this.http.get<Personal>(`${this.apiUrl}/${id}`);
  }

  crear(objeto:Personal){
    delete objeto.nombreCompleto;
    return this.http.post<RespuestaAPI>(this.apiUrl, objeto);
  }
  
  editar(objeto:Personal){
    return this.http.put<RespuestaAPI>(this.apiUrl, objeto);
  }
  
  eliminar(id:number){
    return this.http.delete<RespuestaAPI>(`${this.apiUrl}/${id}`);
  }
}
