import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {Actions, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {map} from 'rxjs/operators';
import {ConfirmComponent} from '../../../../layouts/alerts/confirm/confirm.component';
import {MarqueVehiculeState} from '../../store/marque-vehicule.reducer';
import {selectMarqueVehiculeIsLoadingSpinner} from '../../store/marque-vehicule.selectors';
import {LoadOneMarqueVehiculeSuccess, MarqueVehiculeActionMarques, UpdateMarqueVehiculeRequest} from '../../store/marque-vehicule.actions';

@Component({
  selector: 'app-dialog-update-marque-vehicule',
  templateUrl: './dialog-update-marque-vehicule.component.html',
  styleUrls: ['./dialog-update-marque-vehicule.component.scss']
})
export class DialogUpdateMarqueVehiculeComponent implements OnInit, OnDestroy {

  elementForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    nom: new FormControl('', [Validators.required]),
  });
  isLoadingSpinnerSubscription: Subscription;
  loadOneMarqueVehiculeSuccessSubscription: Subscription;
  updateMarqueVehiculeSuccessSubscription: Subscription;
  isLoadingSpinner: boolean;

  constructor(public dialogRef: MatDialogRef<DialogUpdateMarqueVehiculeComponent>,
              // @Inject(MAT_DIALOG_DATA) public data: { id: number },
              private  updates$: Actions,
              private marqueVehiculeState: Store<MarqueVehiculeState>,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.loadOneMarqueVehiculeSuccessSubscription = this.updates$.pipe(ofType(
      MarqueVehiculeActionMarques.LoadOneMarqueVehiculeSuccess), map((action: LoadOneMarqueVehiculeSuccess) => {
        this.elementForm.setValue({
          id: action.payload.marqueVehicule.id,
          nom: action.payload.marqueVehicule.nom
        });
        // this.dialogRef.close(false);
      })
    ).subscribe();

    this.updateMarqueVehiculeSuccessSubscription = this.updates$.pipe(ofType(
      MarqueVehiculeActionMarques.UpdateMarqueVehiculeSuccess), map((action: LoadOneMarqueVehiculeSuccess) => {
        this.dialogRef.close(false);
      })
    ).subscribe();
    this.isLoadingSpinnerSubscription = this.marqueVehiculeState.select(selectMarqueVehiculeIsLoadingSpinner).subscribe(value => {
      this.isLoadingSpinner = value;
    });
  }

  ngOnDestroy(): void {
    this.isLoadingSpinnerSubscription.unsubscribe();
    this.loadOneMarqueVehiculeSuccessSubscription.unsubscribe();
    this.updateMarqueVehiculeSuccessSubscription.unsubscribe();
  }

  save() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '440px';
    dialogConfig.data = {titre: 'Modification', body: 'Voulez-vous enregistrer la modification ?'};
    this.dialog.open(ConfirmComponent, dialogConfig).afterClosed().subscribe(value => {
      if (value) {
        console.warn(this.elementForm.value);
        this.marqueVehiculeState.dispatch(new UpdateMarqueVehiculeRequest({marqueVehicule: this.elementForm.value}));
      }
    });
  }

  close() {
    this.dialogRef.close(false);
  }

}
