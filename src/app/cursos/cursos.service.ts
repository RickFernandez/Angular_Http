import { Curso } from './cursos-lista/curso.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { delay, take, tap } from 'rxjs/operators'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CursosService {

  private readonly url = `${environment.API_URL}cursos`;

  constructor(private _http: HttpClient) { }

  list() {
    return this._http.get<Curso[]>(this.url!)
      .pipe(
        delay(2000),
        tap(console.log)
      );
  }

  loadById(id: number) {
    return this._http.get<Curso>(`${this.url}/${id}`).pipe(take(1));
  }

  private create(curso: Curso) {
    return this._http.post(this.url, curso).pipe(take(1));
  }

  private update(curso: Curso) {
    return this._http.put(`${this.url}/${curso.id}`, curso).pipe(take(1));
  }

  delete(id: number) {
    return this._http.delete(`${this.url}/${id}`).pipe(take(1));
  }

  save(curso: Curso) {
    if (curso.id) {
      return this.update(curso);
    }

    return this.create(curso);
  }
}
