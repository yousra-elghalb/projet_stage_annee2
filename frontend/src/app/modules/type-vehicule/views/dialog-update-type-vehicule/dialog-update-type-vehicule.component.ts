import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {Actions, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {map} from 'rxjs/operators';
import {ConfirmComponent} from '../../../../layouts/alerts/confirm/confirm.component';
import {TypeVehiculeState} from '../../store/type-vehicule.reducer';
import {selectTypeVehiculeIsLoadingSpinner} from '../../store/type-vehicule.selectors';
import {LoadOneTypeVehiculeSuccess, TypeVehiculeActionTypes, UpdateTypeVehiculeRequest} from '../../store/type-vehicule.actions';

@Component({
  selector: 'app-dialog-update-type-vehicule',
  templateUrl: './dialog-update-type-vehicule.component.html',
  styleUrls: ['./dialog-update-type-vehicule.component.scss']
})
export class DialogUpdateTypeVehiculeComponent implements OnInit, OnDestroy {

  elementForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    nom: new FormControl('', [Validators.required]),
  });
  isLoadingSpinnerSubscription: Subscription;
  loadOneTypeVehiculeSuccessSubscription: Subscription;
  updateTypeVehiculeSuccessSubscription: Subscription;
  isLoadingSpinner: boolean;

  constructor(public dialogRef: MatDialogRef<DialogUpdateTypeVehiculeComponent>,
              // @Inject(MAT_DIALOG_DATA) public data: { id: number },
              private  updates$: Actions,
              private typeVehiculeState: Store<TypeVehiculeState>,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.loadOneTypeVehiculeSuccessSubscription = this.updates$.pipe(ofType(
      TypeVehiculeActionTypes.LoadOneTypeVehiculeSuccess), map((action: LoadOneTypeVehiculeSuccess) => {
        this.elementForm.setValue({
          id: action.payload.typeVehicule.id,
          nom: action.payload.typeVehicule.nom
        });
        // this.dialogRef.close(false);
      })
    ).subscribe();

    this.updateTypeVehiculeSuccessSubscription = this.updates$.pipe(ofType(
      TypeVehiculeActionTypes.UpdateTypeVehiculeSuccess), map((action: LoadOneTypeVehiculeSuccess) => {
        this.dialogRef.close(false);
      })
    ).subscribe();
    this.isLoadingSpinnerSubscription = this.typeVehiculeState.select(selectTypeVehiculeIsLoadingSpinner).subscribe(value => {
      this.isLoadingSpinner = value;
    });
  }

  ngOnDestroy(): void {
    this.isLoadingSpinnerSubscription.unsubscribe();
    this.loadOneTypeVehiculeSuccessSubscription.unsubscribe();
    this.updateTypeVehiculeSuccessSubscription.unsubscribe();
  }

  save() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '440px';
    dialogConfig.data = {titre: 'Modification', body: 'Voulez-vous enregistrer la modification ?'};
    this.dialog.open(ConfirmComponent, dialogConfig).afterClosed().subscribe(value => {
      if (value) {
        console.warn(this.elementForm.value);
        this.typeVehiculeState.dispatch(new UpdateTypeVehiculeRequest({typeVehicule: this.elementForm.value}));
      }
    });
  }

  close() {
    this.dialogRef.close(false);
  }

}
