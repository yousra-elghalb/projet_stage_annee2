import {Injectable} from '@angular/core';
import {FormArray} from '@angular/forms';
import {MatDialogConfig} from '@angular/material';
import {DialogIframePeimentComponent} from '../../../layouts/dialog-iframe-peiment/dialog-iframe-peiment.component';
import {Facture} from '../model/facture';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable()
export class GroupeService {
  url = environment.baseUrlApi;

  constructor(private http: HttpClient) {

  }

  openIframe(dialog, vsrc) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '710px';
    dialogConfig.data = {src: vsrc};
    dialogConfig.panelClass = 'custom-dialog-container';
    dialog.open(DialogIframePeimentComponent, dialogConfig);
  }

  public saveFacture(data: Facture): Observable<any> {
    return this.http.post<any>(this.url + 'facture', data);
  }

}
