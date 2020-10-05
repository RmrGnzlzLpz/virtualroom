import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Institucion } from '../entities/institucion';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InicializarDatosDeEntidadServiceService {

  constructor(private  httpClient: HttpClient) { }

  RegistrarInstitucion(institucion: Institucion): Observable<any> {
    const url = environment.baseUrl + 'institucion';
    return this.httpClient.post<any>(url, institucion);
  }
}
