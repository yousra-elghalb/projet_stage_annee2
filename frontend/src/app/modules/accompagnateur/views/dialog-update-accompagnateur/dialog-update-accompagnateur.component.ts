import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {Actions, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {map} from 'rxjs/operators';
import {ConfirmComponent} from '../../../../layouts/alerts/confirm/confirm.component';
import {AccompagnateurState} from '../../store/accompagnateur.reducer';
import {selectAccompagnateurIsLoadingSpinner} from '../../store/accompagnateur.selectors';
import {LoadOneAccompagnateurSuccess, AccompagnateurActionTypes, UpdateAccompagnateurRequest} from '../../store/accompagnateur.actions';

@Component({
  selector: 'app-dialog-update-accompagnateur',
  templateUrl: './dialog-update-accompagnateur.component.html',
  styleUrls: ['./dialog-update-accompagnateur.component.scss']
})
export class DialogUpdateAccompagnateurComponent implements OnInit, OnDestroy {

  elementForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    nom: new FormControl('', [Validators.required]),
    prenom: new FormControl('', [Validators.required]),
    cin: new FormControl('', [Validators.required]),
    tel: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email]),
  });
  isLoadingSpinnerSubscription: Subscription;
  loadOneAccompagnateurSuccessSubscription: Subscription;
  updateAccompagnateurSuccessSubscription: Subscription;
  isLoadingSpinner: boolean;

  constructor(public dialogRef: MatDialogRef<DialogUpdateAccompagnateurComponent>,
              // @Inject(MAT_DIALOG_DATA) public data: { id: number },
              private  updates$: Actions,
              private accompagnateurState: Store<AccompagnateurState>,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.loadOneAccompagnateurSuccessSubscription = this.updates$.pipe(ofType(
      AccompagnateurActionTypes.LoadOneAccompagnateurSuccess), map((action: LoadOneAccompagnateurSuccess) => {
        this.elementForm.setValue({
          id: action.payload.accompagnateur.id,
          nom: action.payload.accompagnateur.nom,
          prenom: action.payload.accompagnateur.prenom,
          cin: action.payload.accompagnateur.cin,
          tel: action.payload.accompagnateur.tel,
          email: action.payload.accompagnateur.email,
        });
        // this.dialogRef.close(false);
      })
    ).subscribe();

    this.updateAccompagnateurSuccessSubscription = this.updates$.pipe(ofType(
      AccompagnateurActionTypes.UpdateAccompagnateurSuccess), map((action: LoadOneAccompagnateurSuccess) => {
        this.dialogRef.close(false);
      })
    ).subscribe();
    this.isLoadingSpinnerSubscription = this.accompagnateurState.select(selectAccompagnateurIsLoadingSpinner).subscribe(value => {
      this.isLoadingSpinner = value;
    });
  }

  ngOnDestroy(): void {
    this.isLoadingSpinnerSubscription.unsubscribe();
    this.loadOneAccompagnateurSuccessSubscription.unsubscribe();
    this.updateAccompagnateurSuccessSubscription.unsubscribe();
  }

  save() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '440px';
    dialogConfig.data = {titre: 'Modification', body: 'Voulez-vous enregistrer la modification ?'};
    this.dialog.open(ConfirmComponent, dialogConfig).afterClosed().subscribe(value => {
      if (value) {
        console.warn(this.elementForm.value);
        this.accompagnateurState.dispatch(new UpdateAccompagnateurRequest({accompagnateur: this.elementForm.value}));
      }
    });
  }

  close() {
    this.dialogRef.close(false);
  }

}
