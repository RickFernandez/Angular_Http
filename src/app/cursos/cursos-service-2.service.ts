import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CrudService } from '../shared/crud-service';
import { Curso } from './cursos-lista/curso.model';

@Injectable({
  providedIn: 'root'
})
export class CursosService2Service extends CrudService<Curso>  {

  constructor(protected override _http: HttpClient) {
    super(_http, `${environment.API_URL}cursos`);
  }
}
