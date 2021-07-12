import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertaComponent } from '../alerta/alerta.component';

@Injectable({
  providedIn: 'root',
})
export class AlertasService {
  constructor(private bsModalService: BsModalService) {}

  private showAlert(message: string, type: string) {
    const bsModalRef: BsModalRef = this.bsModalService.show(AlertaComponent);
    bsModalRef.content.type = type;
    bsModalRef.content.message = message;
  }

  public showAlertDanger(message: string) {
    this.showAlert(message, 'danger');
  }

  public showAlertSuccess(message: string) {
    this.showAlert(message, 'success');
  }

  public showAlertInfo(message: string) {
    this.showAlert(message, 'info');
  }
}
