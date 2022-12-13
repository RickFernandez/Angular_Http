import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from './alert-modal/alert-modal.component';

enum AlertTypes {
  DANGER = 'danger',
  SUCCESS = 'success',
}

@Injectable({
  providedIn: 'root',
})
export class AlertModalService {

  bsModalRef?: BsModalRef;

  constructor(private _modalService: BsModalService) {}

  private showAlert(message: string, type: AlertTypes, dismissTimeout?: number) {
    this.bsModalRef = this._modalService.show(AlertModalComponent);
    this.bsModalRef.content.type = type;
    this.bsModalRef.content.message = message;

    if (dismissTimeout) {
      setTimeout(() => this.bsModalRef?.hide(), dismissTimeout)
    }
  }

  showAlertDanger(message: string) {
    this.showAlert(message, AlertTypes.DANGER);
  }

  showAlertSuccess(message: string) {
    this.showAlert(message, AlertTypes.SUCCESS, 3000);
  }

  showConfirm(title: string, body: string, okTxt?: string, cancelTxt?: string) {
    this.bsModalRef = this._modalService.show(ConfirmModalComponent);
    this.bsModalRef.content.title = title;
    this.bsModalRef.content.body = body;

    if (okTxt) {
      this.bsModalRef.content.okTxt = okTxt;
    }

    if (cancelTxt) {
      this.bsModalRef.content.cancelTxt = cancelTxt;
    }

    return (<ConfirmModalComponent>this.bsModalRef.content).confirmResult;
  }

}
