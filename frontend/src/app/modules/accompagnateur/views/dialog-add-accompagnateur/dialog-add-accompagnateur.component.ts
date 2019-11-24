import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {MatDialog, MatDialogConfig, MatDialogRef, MatSnackBar} from '@angular/material';
import {Store} from '@ngrx/store';
import {AccompagnateurState} from '../../store/accompagnateur.reducer';
import {Actions, ofType} from '@ngrx/effects';
import {selectAccompagnateurIsLoadingSpinner} from '../../store/accompagnateur.selectors';
import {AccompagnateurActionTypes, SaveAccompagnateurRequest} from '../../store/accompagnateur.actions';
import {map} from 'rxjs/operators';
import {ConfirmComponent} from '../../../../layouts/alerts/confirm/confirm.component';

@Component({
  selector: 'app-dialog-add-accompagnateur',
  templateUrl: './dialog-add-accompagnateur.component.html',
  styleUrls: ['./dialog-add-accompagnateur.component.scss']
})
export class DialogAddAccompagnateurComponent implements OnInit, OnDestroy {
  elementForm = new FormGroup({
    nom: new FormControl('', [Validators.required]),
    prenom: new FormControl('', [Validators.required]),
    cin: new FormControl('', [Validators.required]),
    tel: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email]),
  });
  isLoadingSpinner: boolean;
  isLoadingSpinnerSubscription: Subscription;
  updatesSubscription: Subscription;

  constructor(public dialogRef: MatDialogRef<DialogAddAccompagnateurComponent>,
              private accompagnateurState: Store<AccompagnateurState>,
              private snackBar: MatSnackBar,
              private  updates$: Actions,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.isLoadingSpinnerSubscription = this.accompagnateurState.select(selectAccompagnateurIsLoadingSpinner).subscribe(value => {
      this.isLoadingSpinner = value;
    });
    this.updatesSubscription = this.updates$.pipe(ofType(
      AccompagnateurActionTypes.SaveAccompagnateurSuccess), map(value => {
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
        this.accompagnateurState.dispatch(new SaveAccompagnateurRequest({accompagnateur: this.elementForm.value}));
      }
    });
  }

  reset() {
    this.elementForm.setValue({nom: ''});
  }
}
