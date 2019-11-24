import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {MatDialog, MatDialogConfig, MatDialogRef, MatSnackBar} from '@angular/material';
import {Store} from '@ngrx/store';
import {TypeVehiculeState} from '../../store/type-vehicule.reducer';
import {Actions, ofType} from '@ngrx/effects';
import {selectTypeVehiculeIsLoadingSpinner} from '../../store/type-vehicule.selectors';
import {TypeVehiculeActionTypes, SaveTypeVehiculeRequest} from '../../store/type-vehicule.actions';
import {map} from 'rxjs/operators';
import {ConfirmComponent} from '../../../../layouts/alerts/confirm/confirm.component';

@Component({
  selector: 'app-dialog-add-type-vehicule',
  templateUrl: './dialog-add-type-vehicule.component.html',
  styleUrls: ['./dialog-add-type-vehicule.component.scss']
})
export class DialogAddTypeVehiculeComponent implements OnInit, OnDestroy {
  elementForm = new FormGroup({
    nom: new FormControl('', [Validators.required]),
  });
  isLoadingSpinner: boolean;
  isLoadingSpinnerSubscription: Subscription;
  updatesSubscription: Subscription;

  constructor(public dialogRef: MatDialogRef<DialogAddTypeVehiculeComponent>,
              private typeVehiculeState: Store<TypeVehiculeState>,
              private snackBar: MatSnackBar,
              private  updates$: Actions,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.isLoadingSpinnerSubscription = this.typeVehiculeState.select(selectTypeVehiculeIsLoadingSpinner).subscribe(value => {
      this.isLoadingSpinner = value;
    });
    this.updatesSubscription = this.updates$.pipe(ofType(
      TypeVehiculeActionTypes.SaveTypeVehiculeSuccess), map(value => {
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
        this.typeVehiculeState.dispatch(new SaveTypeVehiculeRequest({typeVehicule: this.elementForm.value}));
      }
    });
  }

  reset() {
    this.elementForm.setValue({nom: ''});
  }
}
