import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {MatDialog, MatDialogConfig, MatDialogRef, MatSnackBar} from '@angular/material';
import {Store} from '@ngrx/store';
import {SocieteState} from '../../store/societe.reducer';
import {Actions, ofType} from '@ngrx/effects';
import {selectSocieteIsLoadingSpinner} from '../../store/societe.selectors';
import {SocieteActionTypes, SaveSocieteRequest} from '../../store/societe.actions';
import {map} from 'rxjs/operators';
import {ConfirmComponent} from '../../../../layouts/alerts/confirm/confirm.component';

@Component({
  selector: 'app-dialog-add-societe',
  templateUrl: './dialog-add-societe.component.html',
  styleUrls: ['./dialog-add-societe.component.scss']
})
export class DialogAddSocieteComponent implements OnInit, OnDestroy {
  elementForm = new FormGroup({
    nom: new FormControl('', [Validators.required]),
  });
  isLoadingSpinner: boolean;
  isLoadingSpinnerSubscription: Subscription;
  updatesSubscription: Subscription;

  constructor(public dialogRef: MatDialogRef<DialogAddSocieteComponent>,
              private societeState: Store<SocieteState>,
              private snackBar: MatSnackBar,
              private  updates$: Actions,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.isLoadingSpinnerSubscription = this.societeState.select(selectSocieteIsLoadingSpinner).subscribe(value => {
      this.isLoadingSpinner = value;
    });
    this.updatesSubscription = this.updates$.pipe(ofType(
      SocieteActionTypes.SaveSocieteSuccess), map(value => {
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
        this.societeState.dispatch(new SaveSocieteRequest({societe: this.elementForm.value}));
      }
    });
  }

  reset() {
    this.elementForm.setValue({nom: ''});
  }
}
