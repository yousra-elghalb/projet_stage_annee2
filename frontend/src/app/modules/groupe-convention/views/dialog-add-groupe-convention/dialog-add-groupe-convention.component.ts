import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {GroupeConventionState} from '../../store/groupe-convention.reducer';
import {GroupeConventionActionTypes, SaveGroupeConventionRequest} from '../../store/groupe-convention.actions';
import {MatDialog, MatDialogConfig, MatDialogRef, MatSnackBar} from '@angular/material';
import {ConfirmComponent} from '../../../../layouts/alerts/confirm/confirm.component';
import {Subscription} from 'rxjs';
import {selectGroupeConventionIsLoadingSpinner} from '../../store/groupe-convention.selectors';
import {Actions, ofType} from '@ngrx/effects';
import {map, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-model-add-groupe-vonvention',
  templateUrl: './dialog-add-groupe-convention.component.html',
  styleUrls: ['./dialog-add-groupe-convention.component.scss']
})
export class DialogAddGroupeConventionComponent implements OnInit, OnDestroy {
  elementForm = new FormGroup({
    nom: new FormControl(''),
    raisonSociale: new FormControl('', []),
    responsable: new FormControl('', []),
    type: new FormControl('societe', [Validators.required]),
    reduction: new FormControl('', [Validators.required]),
    ice: new FormControl('', []),
    tel: new FormControl('', []),
    adresse: new FormControl('', []),
    taille: new FormControl('', []),
  });
  isLoadingSpinner: boolean;
  isLoadingSpinnerSubscription: Subscription;
  updatesSubscription: Subscription;

  constructor(public dialogRef: MatDialogRef<DialogAddGroupeConventionComponent>,
              private groupeConventionState: Store<GroupeConventionState>,
              private snackBar: MatSnackBar,
              private  updates$: Actions,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.isLoadingSpinnerSubscription = this.groupeConventionState.select(selectGroupeConventionIsLoadingSpinner).subscribe(value => {
      this.isLoadingSpinner = value;
    });
    this.updatesSubscription = this.updates$.pipe(ofType(
      GroupeConventionActionTypes.SaveGroupeConventionSuccess), map(value => {
        this.dialogRef.close(false);
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.isLoadingSpinnerSubscription.unsubscribe();
    this.updatesSubscription.unsubscribe();
  }

  save() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '440px';
    dialogConfig.data = {titre: 'Ajout', body: 'Voulez-vous Entregistrer ?'};
    this.dialog.open(ConfirmComponent, dialogConfig).afterClosed().subscribe(value => {
      if (value) {
        this.groupeConventionState.dispatch(new SaveGroupeConventionRequest({groupeConvention: this.elementForm.value}));
      }
    });
  }

  reset() {
    this.elementForm.setValue({nom: ''});
  }
}
