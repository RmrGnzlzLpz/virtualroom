import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Institucion } from '../entities/institucion';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Docente } from '../entities/docente';
import { Grupo } from '../entities/grupo';
import { Estudiante } from '../entities/estudiante';
import { Directivo } from '../entities/directivo';
import { Asignatura } from '../entities/asignatura';

@Injectable({
  providedIn: 'root'
})
export class InicializarDatosDeEntidadServiceService {
  constructor(private  httpClient: HttpClient) { }
  RegistrarAsignaturas(request: any) {
    const url = environment.baseUrl + 'asignatura';
    return this.httpClient.post<any>(url, request);
  }
  RegistrarGrupos(request:any) : Observable<any> {
    const url = environment.baseUrl + 'grupo';
    return this.httpClient.post<any>(url, request);
  }
  RegistrarEstudiantes(request: any): Observable<any>  {
    const url = environment.baseUrl + 'estudiante';
    return this.httpClient.post<any>(url, request);
  }
  RegistrarDocentes(request: any): Observable<any>  {
    const url = environment.baseUrl + 'docente';
    return this.httpClient.post<any>(url, request);
  }
  RegistrarDirectivos(request: any) : Observable<any> {
    const url = environment.baseUrl + 'directivo';
    return this.httpClient.post<any>(url, request);
  }


  RegistrarInstitucion(institucion: Institucion): Observable<any> {
    const url = environment.baseUrl + 'institucion';
    return this.httpClient.post<any>(url, institucion);
  }
}
