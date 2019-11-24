import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {MatDialog, MatDialogConfig, MatDialogRef, MatSnackBar} from '@angular/material';
import {Store} from '@ngrx/store';
import {MarqueVehiculeState} from '../../store/marque-vehicule.reducer';
import {Actions, ofType} from '@ngrx/effects';
import {selectMarqueVehiculeIsLoadingSpinner} from '../../store/marque-vehicule.selectors';
import {MarqueVehiculeActionMarques, SaveMarqueVehiculeRequest} from '../../store/marque-vehicule.actions';
import {map} from 'rxjs/operators';
import {ConfirmComponent} from '../../../../layouts/alerts/confirm/confirm.component';

@Component({
  selector: 'app-dialog-add-marque-vehicule',
  templateUrl: './dialog-add-marque-vehicule.component.html',
  styleUrls: ['./dialog-add-marque-vehicule.component.scss']
})
export class DialogAddMarqueVehiculeComponent implements OnInit, OnDestroy {
  elementForm = new FormGroup({
    nom: new FormControl('', [Validators.required]),
  });
  isLoadingSpinner: boolean;
  isLoadingSpinnerSubscription: Subscription;
  updatesSubscription: Subscription;

  constructor(public dialogRef: MatDialogRef<DialogAddMarqueVehiculeComponent>,
              private marqueVehiculeState: Store<MarqueVehiculeState>,
              private snackBar: MatSnackBar,
              private  updates$: Actions,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.isLoadingSpinnerSubscription = this.marqueVehiculeState.select(selectMarqueVehiculeIsLoadingSpinner).subscribe(value => {
      this.isLoadingSpinner = value;
    });
    this.updatesSubscription = this.updates$.pipe(ofType(
      MarqueVehiculeActionMarques.SaveMarqueVehiculeSuccess), map(value => {
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
        this.marqueVehiculeState.dispatch(new SaveMarqueVehiculeRequest({marqueVehicule: this.elementForm.value}));
      }
    });
  }

  reset() {
    this.elementForm.setValue({nom: ''});
  }
}
