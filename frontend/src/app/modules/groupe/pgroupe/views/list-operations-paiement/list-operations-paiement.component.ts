import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {PGroupe} from '../../model/p-groupe';
import {OffreVoyage} from '../../../../offre-voyage/model/offre-voyage';
import {Actions} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {PGroupeState} from '../../store/p-groupe.reducer';
import {FormArray} from '@angular/forms';
import {GroupeService} from '../../../service/groupe.service';
import {selectCommercial, selectUserPermissions} from '../../../../user/store/user.selectors';
import {Observable} from 'rxjs';
import {UserPermissions} from '../../../../user/model/user-permissions';
import {Commercial} from '../../../../commercial/model/commercial';
import {DialogUpdateFactureComponent} from '../dialog-update-facture/dialog-update-facture.component';
import {FacturePGroupeComponent} from '../print/facture-p-groupe/facture-p-groupe.component';

@Component({
  selector: 'app-list-operations-paiement',
  templateUrl: './list-operations-paiement.component.html',
  styleUrls: ['./list-operations-paiement.component.scss']
})
export class ListOperationsPaiementComponent implements OnInit {
  userPermission: Observable<UserPermissions>;
  commercial: Observable<Commercial>;

  constructor(
    public dialogRef: MatDialogRef<ListOperationsPaiementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { pGroupe: PGroupe, offreVoyage: OffreVoyage },
    private  updates$: Actions,
    private groupeService: GroupeService,
    private store: Store<PGroupeState>,
    private dialog: MatDialog) {
  }

  ngOnInit() {

    this.userPermission = this.store.select(selectUserPermissions);
    this.commercial = this.store.select(selectCommercial);
  }

  openIframe(src) {
    this.groupeService.openIframe(this.dialog, src);
  }

  editFacture(element) {
    this.dialogRef.close();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '600px';
    dialogConfig.data = {offreVoyage: this.data.offreVoyage, pGroupe: this.data.pGroupe, traite: element};
    this.dialog.open(DialogUpdateFactureComponent, dialogConfig);
  }

  printFacture(element) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '900px';
    dialogConfig.height = '90vh';
    dialogConfig.data = {offreVoyage: this.data.offreVoyage, pGroupe: this.data.pGroupe, traite: element};
    this.dialog.open(FacturePGroupeComponent, dialogConfig);
  }

}
