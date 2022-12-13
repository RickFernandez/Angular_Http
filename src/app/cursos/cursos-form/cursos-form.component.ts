import { Curso } from './../cursos-lista/curso.model';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { CursosService } from '../cursos.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss'],
})
export class CursosFormComponent implements OnInit {
  form!: FormGroup;
  submited = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _cursosService: CursosService,
    private _modalService: AlertModalService,
    private _location: Location,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    const curso = this._route.snapshot.data['curso'];

    this.form = this._formBuilder.group({
      id: [curso.id],
      nome: [
        curso.nome,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
    });
  }

  hasError(field: string) {
    return this.form.get(field)?.errors;
  }

  onSubmit() {
    this.submited = true;
    console.log(this.form.value);
    if (this.form.valid) {

      let msgSuccess = "Curso criado com sucesso!";
      let msgError = "Erro ao criar curso. Tente novamente mais tarde...";

      if (this.form.value.id) {
        msgSuccess = "Curso atualizado com sucesso!";
        msgError = "Erro ao atualizar curso. Tente novamente mais tarde...";
      }

      this._cursosService.save(this.form.value).subscribe(
        success => {
          this._modalService.showAlertSuccess(msgSuccess);
          this._location.back();
        },
        error => {
          this._modalService.showAlertDanger(msgError);
        }
      );
    }
  }

  onCancel() {
    this.submited = false;
    this._location.back();
  }
}
