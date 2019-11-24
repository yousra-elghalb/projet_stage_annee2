import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {Actions, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {map} from 'rxjs/operators';
import {ConfirmComponent} from '../../../../layouts/alerts/confirm/confirm.component';
import {PaysState} from '../../store/pays.reducer';
import {selectPaysIsLoadingSpinner} from '../../store/pays.selectors';
import {LoadOnePaysSuccess, PaysActionTypes, UpdatePaysRequest} from '../../store/pays.actions';

@Component({
  selector: 'app-dialog-update-pays',
  templateUrl: './dialog-update-pays.component.html',
  styleUrls: ['./dialog-update-pays.component.scss']
})
export class DialogUpdatePaysComponent implements OnInit, OnDestroy {

  elementForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    nom: new FormControl('', [Validators.required]),
  });
  isLoadingSpinnerSubscription: Subscription;
  loadOnePaysSuccessSubscription: Subscription;
  updatePaysSuccessSubscription: Subscription;
  isLoadingSpinner: boolean;

  constructor(public dialogRef: MatDialogRef<DialogUpdatePaysComponent>,
              // @Inject(MAT_DIALOG_DATA) public data: { id: number },
              private  updates$: Actions,
              private paysState: Store<PaysState>,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.loadOnePaysSuccessSubscription = this.updates$.pipe(ofType(
      PaysActionTypes.LoadOnePaysSuccess), map((action: LoadOnePaysSuccess) => {
        this.elementForm.setValue({
          id: action.payload.pays.id,
          nom: action.payload.pays.nom
        });
        // this.dialogRef.close(false);
      })
    ).subscribe();

    this.updatePaysSuccessSubscription = this.updates$.pipe(ofType(
      PaysActionTypes.UpdatePaysSuccess), map((action: LoadOnePaysSuccess) => {
        this.dialogRef.close(false);
      })
    ).subscribe();
    this.isLoadingSpinnerSubscription = this.paysState.select(selectPaysIsLoadingSpinner).subscribe(value => {
      this.isLoadingSpinner = value;
    });
  }

  ngOnDestroy(): void {
    this.isLoadingSpinnerSubscription.unsubscribe();
    this.loadOnePaysSuccessSubscription.unsubscribe();
    this.updatePaysSuccessSubscription.unsubscribe();
  }

  save() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '440px';
    dialogConfig.data = {titre: 'Modification', body: 'Voulez-vous enregistrer la modification ?'};
    this.dialog.open(ConfirmComponent, dialogConfig).afterClosed().subscribe(value => {
      if (value) {
        console.warn(this.elementForm.value);
        this.paysState.dispatch(new UpdatePaysRequest({pays: this.elementForm.value}));
      }
    });
  }

  close() {
    this.dialogRef.close(false);
  }

}
