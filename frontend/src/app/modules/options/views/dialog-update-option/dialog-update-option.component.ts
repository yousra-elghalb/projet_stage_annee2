import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {Actions, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {map} from 'rxjs/operators';
import {ConfirmComponent} from '../../../../layouts/alerts/confirm/confirm.component';
import {OptionState} from '../../store/option.reducer';
import {selectOptionIsLoadingSpinner} from '../../store/option.selectors';
import {LoadOneOptionSuccess, OptionActionTypes, UpdateOptionRequest} from '../../store/option.actions';

@Component({
  selector: 'app-dialog-update-option',
  templateUrl: './dialog-update-option.component.html',
  styleUrls: ['./dialog-update-option.component.scss']
})
export class DialogUpdateOptionComponent implements OnInit, OnDestroy {

  elementForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    nom: new FormControl('', [Validators.required]),
  });
  isLoadingSpinnerSubscription: Subscription;
  loadOneOptionSuccessSubscription: Subscription;
  updateOptionSuccessSubscription: Subscription;
  isLoadingSpinner: boolean;

  constructor(public dialogRef: MatDialogRef<DialogUpdateOptionComponent>,
              // @Inject(MAT_DIALOG_DATA) public data: { id: number },
              private  updates$: Actions,
              private optionState: Store<OptionState>,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.loadOneOptionSuccessSubscription = this.updates$.pipe(ofType(
      OptionActionTypes.LoadOneOptionSuccess), map((action: LoadOneOptionSuccess) => {
        this.elementForm.setValue({
          id: action.payload.option.id,
          nom: action.payload.option.nom
        });
        // this.dialogRef.close(false);
      })
    ).subscribe();

    this.updateOptionSuccessSubscription = this.updates$.pipe(ofType(
      OptionActionTypes.UpdateOptionSuccess), map((action: LoadOneOptionSuccess) => {
        this.dialogRef.close(false);
      })
    ).subscribe();
    this.isLoadingSpinnerSubscription = this.optionState.select(selectOptionIsLoadingSpinner).subscribe(value => {
      this.isLoadingSpinner = value;
    });
  }

  ngOnDestroy(): void {
    this.isLoadingSpinnerSubscription.unsubscribe();
    this.loadOneOptionSuccessSubscription.unsubscribe();
    this.updateOptionSuccessSubscription.unsubscribe();
  }

  save() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '440px';
    dialogConfig.data = {titre: 'Modification', body: 'Voulez-vous enregistrer la modification ?'};
    this.dialog.open(ConfirmComponent, dialogConfig).afterClosed().subscribe(value => {
      if (value) {
        console.warn(this.elementForm.value);
        this.optionState.dispatch(new UpdateOptionRequest({option: this.elementForm.value}));
      }
    });
  }

  close() {
    this.dialogRef.close(false);
  }

}
