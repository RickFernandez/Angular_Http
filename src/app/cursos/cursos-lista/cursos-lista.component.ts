import { CursosService2Service } from './../cursos-service-2.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CursosService } from './../cursos.service';
import { Curso } from './curso.model';
import {
  catchError,
  EMPTY,
  empty,
  Observable,
  Subject,
  switchMap,
  take,
} from 'rxjs';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
  preserveWhitespaces: true,
})
export class CursosListaComponent implements OnInit {
  // cursos!: Curso[];

  // '$' prática dotada para variáveis que são Observables
  cursos$!: Observable<Curso[]>;
  error$ = new Subject<boolean>();

  deleteModalRef?: BsModalRef;
  @ViewChild('deleteModal') deleteModal: any;

  cursoSelecionado!: Curso;

  constructor(
    private _cursoService: CursosService2Service,
    private _alertModalService: AlertModalService,
    private _router: Router,
    private _route: ActivatedRoute,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.onRefresh();
  }

  onRefresh() {
    this.cursos$ = this._cursoService.list().pipe(
      catchError((error) => {
        console.error(error);
        this.handleError();
        return EMPTY;
      })
    );
  }

  onEdit(id: number) {
    this._router.navigate(['editar', id], { relativeTo: this._route });
  }

  onDelete(curso: Curso) {
    this.cursoSelecionado = curso;
    const result$ = this._alertModalService.showConfirm(
      'Confirmação',
      'Tem certeza que deseja remover este curso?'
    );
    result$
      .asObservable()
      .pipe(
        take(1),
        switchMap((result: any) =>
          result ? this._cursoService.delete(curso.id) : EMPTY
        )
      )
      .subscribe(
        (success) => {
          this.deleteModalRef?.hide(),
            this._alertModalService.showAlertSuccess(
              'Curso removido com sucesso!'
            ),
            this.onRefresh();
        },
        (error) => {
          this._alertModalService.showAlertDanger(
            'Erro ao tentar remover este curso. Tente novamente mais tarde...'
          );
        }
      );
  }

  onConfirmDelete() {
    this._cursoService.delete(this.cursoSelecionado.id).subscribe(
      (success) => {
        this.deleteModalRef?.hide(),
          this._alertModalService.showAlertSuccess(
            'Curso removido com sucesso!'
          ),
          this.onRefresh();
      },
      (error) => {
        this._alertModalService.showAlertDanger(
          'Erro ao tentar remover este curso. Tente novamente mais tarde...'
        );
      }
    );
  }

  onDeclineDelete() {
    this.deleteModalRef?.hide();
  }

  handleError() {
    this._alertModalService.showAlertDanger(
      'Erro ao carregar cursos. Tente novamente mais tarde...'
    );
  }
}
