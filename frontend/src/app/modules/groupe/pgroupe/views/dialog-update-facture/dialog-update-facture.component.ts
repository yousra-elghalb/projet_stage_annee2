import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {Actions, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {map} from 'rxjs/operators';
import {PGroupe} from '../../model/p-groupe';
import {PGroupeState} from '../../store/p-groupe.reducer';
import {OffreVoyage} from '../../../../offre-voyage/model/offre-voyage';
import {PGroupeActionTypes, SavePGroupeFactureRequest, SavePGroupeFactureSuccess} from '../../store/p-groupe.actions';
import {ConfirmComponent} from '../../../../../layouts/alerts/confirm/confirm.component';
import {selectPGroupeIsLoadingSpinner} from '../../store/p-groupe.selectors';
import {Traite} from '../../../../offre-voyage/model/traite';

@Component({
  selector: 'app-dialog-update-facture',
  templateUrl: './dialog-update-facture.component.html',
  styleUrls: ['./dialog-update-facture.component.scss']
})
export class DialogUpdateFactureComponent implements OnInit, OnDestroy {

  elementForm = new FormGroup({
    id: new FormControl('', []),
    ref: new FormControl('', []),
    num: new FormControl('', []),
    nom_voyageur: new FormControl('', []),
    cin: new FormControl('', []),
    desi: new FormControl('', [Validators.required]),
    qte: new FormControl({value: '', disabled: true}, [Validators.required]),
    voyageur: new FormControl('', []),
    qte_enfant: new FormControl({value: '', disabled: true}, []),
    qte_bebe: new FormControl({value: '', disabled: true}, []),
    pu: new FormControl({value: '', disabled: true}, [Validators.required]),
    pu_enfant: new FormControl({value: '', disabled: true}, [Validators.required]),
    pu_bebe: new FormControl({value: '', disabled: true}, [Validators.required]),
    reduction: new FormControl({value: '', disabled: true}, []),
    ttc: new FormControl('', [Validators.required]),
    totale_options: new FormControl({value: '', disabled: true}, []),
    traite_id: new FormControl('', [Validators.required]),
  });
  isLoadingSpinnerSubscription: Subscription;
  updateFactureSuccessSubscription: Subscription;
  isLoadingSpinner: boolean;

  constructor(public dialogRef: MatDialogRef<DialogUpdateFactureComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { pGroupe: PGroupe, offreVoyage: OffreVoyage, traite: Traite },
              private  updates$: Actions,
              private state: Store<PGroupeState>,
              private dialog: MatDialog) {
    if (data.traite.facture) {
      this.elementForm.patchValue({
        id: data.traite.facture.id,
        ref: data.traite.facture.ref,
        num: data.traite.facture.num,
        desi: data.traite.facture.desi,
        nom_voyageur: data.traite.facture.nom_voyageur,
        cin: data.traite.facture.cin,
        // ttc: data.traite.facture.ttc,
        traite_id: data.traite.facture.traite_id,
      });
    }
    let options = 0;
    if (data.pGroupe.options) {
      data.pGroupe.options.forEach(value => {
        options += value.pivot.prix;
      });
    }
    this.elementForm.patchValue({
      qte: data.pGroupe.voyageurs.filter(value => value.stadeVie === 'adulte').length,
      qte_enfant: data.pGroupe.voyageurs.filter(value => value.stadeVie === 'enfant').length,
      qte_bebe: data.pGroupe.voyageurs.filter(value => value.stadeVie === 'bébé').length,
      pu: data.offreVoyage.prixAdulte,
      pu_enfant: data.offreVoyage.prixAdulte,
      pu_bebe: data.offreVoyage.prixAdulte,
      reduction: data.pGroupe.reduction,
      ttc: data.traite.montant,
      desi: data.offreVoyage.voyage.description,
      totale_options: options,
      traite_id: data.traite.id,
    });
  }

  ngOnInit() {
    this.isLoadingSpinnerSubscription = this.state.select(selectPGroupeIsLoadingSpinner).subscribe(value => {
      this.isLoadingSpinner = value;
    });
    this.updateFactureSuccessSubscription = this.updates$.pipe(ofType(
      PGroupeActionTypes.SavePGroupeFactureSuccess), map((action: SavePGroupeFactureSuccess) => {
        this.dialogRef.close(false);
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.isLoadingSpinnerSubscription.unsubscribe();
    this.updateFactureSuccessSubscription.unsubscribe();
  }

  save() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '440px';
    dialogConfig.data = {titre: 'Modification', body: 'Voulez-vous enregistrer la modification ?'};
    this.dialog.open(ConfirmComponent, dialogConfig).afterClosed().subscribe(value => {
      if (value) {
        const data = {
          ...this.elementForm.value
        };
        delete data.voyageur;
        this.state.dispatch(new SavePGroupeFactureRequest({
          facture: data,
          pGroupe: this.data.pGroupe
        }));
      }
    });
  }

  close() {
    this.dialogRef.close(false);
  }

  clientChange() {
    this.elementForm.patchValue({
      nom_voyageur: this.elementForm.value.voyageur.nom + ' ' + this.elementForm.value.voyageur.prenom,
      cin: this.elementForm.value.voyageur.cin
    });
  }
}
