import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { appsettings } from '../../Settings/appsettings';
import { Hijo } from '../../Models/Hijo';
import { RespuestaAPI } from '../../Models/RespuestaAPI';

@Injectable({
  providedIn: 'root'
})
export class HijoService {

  private http = inject(HttpClient);
  private apiUrl:string = appsettings.apiUrl + "Hijo";

  constructor() { }
  
  lista(id:number){
    return this.http.get<Hijo[]>(`${this.apiUrl}/lista/${id}`);
  }

  obtener(id:number){
    return this.http.get<Hijo>(`${this.apiUrl}/${id}`);
  }

  crear(objeto:Hijo){
    return this.http.post<RespuestaAPI>(this.apiUrl, objeto);
  }
  
  editar(objeto:Hijo){
    return this.http.put<RespuestaAPI>(this.apiUrl, objeto);
  }
  
  eliminar(id:number){
    return this.http.delete<RespuestaAPI>(`${this.apiUrl}/${id}`);
  }
}
