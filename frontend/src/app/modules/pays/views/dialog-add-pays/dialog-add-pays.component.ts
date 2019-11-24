import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {MatDialog, MatDialogConfig, MatDialogRef, MatSnackBar} from '@angular/material';
import {Store} from '@ngrx/store';
import {PaysState} from '../../store/pays.reducer';
import {Actions, ofType} from '@ngrx/effects';
import {selectPaysIsLoadingSpinner} from '../../store/pays.selectors';
import {PaysActionTypes, SavePaysRequest} from '../../store/pays.actions';
import {map} from 'rxjs/operators';
import {ConfirmComponent} from '../../../../layouts/alerts/confirm/confirm.component';

@Component({
  selector: 'app-dialog-add-pays',
  templateUrl: './dialog-add-pays.component.html',
  styleUrls: ['./dialog-add-pays.component.scss']
})
export class DialogAddPaysComponent implements OnInit, OnDestroy {
  elementForm = new FormGroup({
    nom: new FormControl('', [Validators.required]),
  });
  isLoadingSpinner: boolean;
  isLoadingSpinnerSubscription: Subscription;
  updatesSubscription: Subscription;

  constructor(public dialogRef: MatDialogRef<DialogAddPaysComponent>,
              private paysState: Store<PaysState>,
              private snackBar: MatSnackBar,
              private  updates$: Actions,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.isLoadingSpinnerSubscription = this.paysState.select(selectPaysIsLoadingSpinner).subscribe(value => {
      this.isLoadingSpinner = value;
    });
    this.updatesSubscription = this.updates$.pipe(ofType(
      PaysActionTypes.SavePaysSuccess), map(value => {
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
        this.paysState.dispatch(new SavePaysRequest({pays: this.elementForm.value}));
      }
    });
  }

  reset() {
    this.elementForm.setValue({nom: ''});
  }
}
