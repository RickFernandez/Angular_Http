import { CursosService } from './../cursos.service';
import { Curso } from './../cursos-lista/curso.model';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CursoResolverGuard implements Resolve<Curso> {

  constructor(private _cursosService: CursosService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Curso | Observable<any> {

    if (route.params && route.params['id']) {
      return this._cursosService.loadById(route.params['id']);
    }

    return of({
      id: null,
      nome: null
    });

  }
}
