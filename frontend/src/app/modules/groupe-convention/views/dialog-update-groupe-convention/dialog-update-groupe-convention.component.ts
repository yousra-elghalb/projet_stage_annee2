import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {ConfirmComponent} from '../../../../layouts/alerts/confirm/confirm.component';
import {Store} from '@ngrx/store';
import {GroupeConventionState} from '../../store/groupe-convention.reducer';
import {
  LoadOneGroupeConventionSuccess,
  GroupeConventionActionTypes,
  SaveGroupeConventionRequest,
  UpdateGroupeConventionRequest
} from '../../store/groupe-convention.actions';
import {GroupeConvention} from '../../model/groupe-convention';
import {selectGroupeConventionIsLoadingSpinner} from '../../store/groupe-convention.selectors';
import {Subscription} from 'rxjs';
import {Actions, ofType} from '@ngrx/effects';
import {map} from 'rxjs/operators';
import {Permission} from '../../../permission/model/permission';

@Component({
  selector: 'app-dialog-update-groupe-convention',
  templateUrl: './dialog-update-groupe-convention.component.html',
  styleUrls: ['./dialog-update-groupe-convention.component.scss']
})
export class DialogUpdateGroupeConventionComponent implements OnInit, OnDestroy {
  elementForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    nom: new FormControl(''),
    raisonSociale: new FormControl('', []),
    responsable: new FormControl('', []),
    type: new FormControl('', [Validators.required]),
    reduction: new FormControl('', [Validators.required]),
    ice: new FormControl('', []),
    tel: new FormControl('', []),
    adresse: new FormControl('', []),
    taille: new FormControl('', []),
  });
  isLoadingSpinnerSubscription: Subscription;
  loadOneGroupeConventionSuccessSubscription: Subscription;
  updateGroupeConventionSuccessSubscription: Subscription;
  isLoadingSpinner: boolean;
  permissions: Permission[];

  constructor(public dialogRef: MatDialogRef<DialogUpdateGroupeConventionComponent>,
              // @Inject(MAT_DIALOG_DATA) public data: { id: number },
              private  updates$: Actions,
              private groupeConventionState: Store<GroupeConventionState>,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.loadOneGroupeConventionSuccessSubscription = this.updates$.pipe(ofType(
      GroupeConventionActionTypes.LoadOneGroupeConventionSuccess), map((action: LoadOneGroupeConventionSuccess) => {
        this.elementForm.setValue({
          id: action.payload.groupeConvention.id,
          nom: action.payload.groupeConvention.nom,
          type: action.payload.groupeConvention.type,
          raisonSociale: action.payload.groupeConvention.raisonSociale,
          tel: action.payload.groupeConvention.tel,
          responsable: action.payload.groupeConvention.responsable,
          ice: action.payload.groupeConvention.ice,
          adresse: action.payload.groupeConvention.adresse,
          taille: action.payload.groupeConvention.taille,
          reduction: action.payload.groupeConvention.reduction,
        });
        // this.dialogRef.close(false);
      })
    ).subscribe();

    this.updateGroupeConventionSuccessSubscription = this.updates$.pipe(ofType(
      GroupeConventionActionTypes.UpdateGroupeConventionSuccess), map((action: LoadOneGroupeConventionSuccess) => {
        this.dialogRef.close(false);
      })
    ).subscribe();
    this.isLoadingSpinnerSubscription = this.groupeConventionState.select(selectGroupeConventionIsLoadingSpinner).subscribe(value => {
      this.isLoadingSpinner = value;
    });
  }

  ngOnDestroy(): void {
    this.isLoadingSpinnerSubscription.unsubscribe();
    this.loadOneGroupeConventionSuccessSubscription.unsubscribe();
    this.updateGroupeConventionSuccessSubscription.unsubscribe();
  }

  save() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '440px';
    dialogConfig.data = {titre: 'Modification', body: 'Voulez-vous enregistrer la modification ?'};
    this.dialog.open(ConfirmComponent, dialogConfig).afterClosed().subscribe(value => {
      if (value) {
        console.warn(this.elementForm.value);
        this.groupeConventionState.dispatch(new UpdateGroupeConventionRequest({
          groupeConvention: {
            ...this.elementForm.value,
            permissions: this.permissions
          }
        }));
      }
    });
  }

  close() {
    this.dialogRef.close(false);
  }
}
