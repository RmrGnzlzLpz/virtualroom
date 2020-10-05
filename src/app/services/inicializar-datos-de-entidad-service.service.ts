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
  RegistrarAsignaturas(asignaturas: Asignatura[]) {
    const url = environment.baseUrl + 'asignatura';
    return this.httpClient.post<any>(url, asignaturas);
  }
  RegistrarGrupos(grupos:Grupo[]) : Observable<any> {
    const url = environment.baseUrl + 'grupo';
    return this.httpClient.post<any>(url, grupos);
  }
  RegistrarEstudiantes(estudiantes: Estudiante[]): Observable<any>  {
    const url = environment.baseUrl + 'estudiante';
    return this.httpClient.post<any>(url, estudiantes);
  }
  RegistrarDocentes(docentes: Docente[]): Observable<any>  {
    const url = environment.baseUrl + 'docente';
    return this.httpClient.post<any>(url, docentes);
  }
  RegistrarDirectivos(directivos: Directivo[]) : Observable<any> {
    const url = environment.baseUrl + 'directivo';
    return this.httpClient.post<any>(url, directivos);
  }

  constructor(private  httpClient: HttpClient) { }

  RegistrarInstitucion(institucion: Institucion): Observable<any> {
    const url = environment.baseUrl + 'institucion';
    return this.httpClient.post<any>(url, institucion);
  }
}
