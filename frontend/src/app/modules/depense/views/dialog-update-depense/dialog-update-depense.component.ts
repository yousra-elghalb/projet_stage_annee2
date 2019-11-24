import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {Actions, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {map} from 'rxjs/operators';
import {ConfirmComponent} from '../../../../layouts/alerts/confirm/confirm.component';
import {DepenseState} from '../../store/depense.reducer';
import {selectDepenseIsLoadingSpinner} from '../../store/depense.selectors';
import {LoadOneDepenseSuccess, DepenseActionTypes, UpdateDepenseRequest} from '../../store/depense.actions';

@Component({
  selector: 'app-dialog-update-depense',
  templateUrl: './dialog-update-depense.component.html',
  styleUrls: ['./dialog-update-depense.component.scss']
})
export class DialogUpdateDepenseComponent implements OnInit, OnDestroy {

  elementForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    nom: new FormControl('', [Validators.required]),
  });
  isLoadingSpinnerSubscription: Subscription;
  loadOneDepenseSuccessSubscription: Subscription;
  updateDepenseSuccessSubscription: Subscription;
  isLoadingSpinner: boolean;

  constructor(public dialogRef: MatDialogRef<DialogUpdateDepenseComponent>,
              // @Inject(MAT_DIALOG_DATA) public data: { id: number },
              private  updates$: Actions,
              private depenseState: Store<DepenseState>,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.loadOneDepenseSuccessSubscription = this.updates$.pipe(ofType(
      DepenseActionTypes.LoadOneDepenseSuccess), map((action: LoadOneDepenseSuccess) => {
        this.elementForm.setValue({
          id: action.payload.depense.id,
          nom: action.payload.depense.nom
        });
        // this.dialogRef.close(false);
      })
    ).subscribe();

    this.updateDepenseSuccessSubscription = this.updates$.pipe(ofType(
      DepenseActionTypes.UpdateDepenseSuccess), map((action: LoadOneDepenseSuccess) => {
        this.dialogRef.close(false);
      })
    ).subscribe();
    this.isLoadingSpinnerSubscription = this.depenseState.select(selectDepenseIsLoadingSpinner).subscribe(value => {
      this.isLoadingSpinner = value;
    });
  }

  ngOnDestroy(): void {
    this.isLoadingSpinnerSubscription.unsubscribe();
    this.loadOneDepenseSuccessSubscription.unsubscribe();
    this.updateDepenseSuccessSubscription.unsubscribe();
  }

  save() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '440px';
    dialogConfig.data = {titre: 'Modification', body: 'Voulez-vous enregistrer la modification ?'};
    this.dialog.open(ConfirmComponent, dialogConfig).afterClosed().subscribe(value => {
      if (value) {
        console.warn(this.elementForm.value);
        this.depenseState.dispatch(new UpdateDepenseRequest({depense: this.elementForm.value}));
      }
    });
  }

  close() {
    this.dialogRef.close(false);
  }

}
