import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {Actions, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {map} from 'rxjs/operators';
import {ConfirmComponent} from '../../../../layouts/alerts/confirm/confirm.component';
import {ModaliteState} from '../../store/modalite.reducer';
import {selectModaliteIsLoadingSpinner} from '../../store/modalite.selectors';
import {LoadOneModaliteSuccess, ModaliteActionTypes, UpdateModaliteRequest} from '../../store/modalite.actions';

@Component({
  selector: 'app-dialog-update-modalite',
  templateUrl: './dialog-update-modalite.component.html',
  styleUrls: ['./dialog-update-modalite.component.scss']
})
export class DialogUpdateModaliteComponent implements OnInit, OnDestroy {

  elementForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    nom: new FormControl('', [Validators.required]),
  });
  isLoadingSpinnerSubscription: Subscription;
  loadOneModaliteSuccessSubscription: Subscription;
  updateModaliteSuccessSubscription: Subscription;
  isLoadingSpinner: boolean;

  constructor(public dialogRef: MatDialogRef<DialogUpdateModaliteComponent>,
              // @Inject(MAT_DIALOG_DATA) public data: { id: number },
              private  updates$: Actions,
              private modaliteState: Store<ModaliteState>,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.loadOneModaliteSuccessSubscription = this.updates$.pipe(ofType(
      ModaliteActionTypes.LoadOneModaliteSuccess), map((action: LoadOneModaliteSuccess) => {
        this.elementForm.setValue({
          id: action.payload.modalite.id,
          nom: action.payload.modalite.nom
        });
        // this.dialogRef.close(false);
      })
    ).subscribe();

    this.updateModaliteSuccessSubscription = this.updates$.pipe(ofType(
      ModaliteActionTypes.UpdateModaliteSuccess), map((action: LoadOneModaliteSuccess) => {
        this.dialogRef.close(false);
      })
    ).subscribe();
    this.isLoadingSpinnerSubscription = this.modaliteState.select(selectModaliteIsLoadingSpinner).subscribe(value => {
      this.isLoadingSpinner = value;
    });
  }

  ngOnDestroy(): void {
    this.isLoadingSpinnerSubscription.unsubscribe();
    this.loadOneModaliteSuccessSubscription.unsubscribe();
    this.updateModaliteSuccessSubscription.unsubscribe();
  }

  save() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '440px';
    dialogConfig.data = {titre: 'Modification', body: 'Voulez-vous enregistrer la modification ?'};
    this.dialog.open(ConfirmComponent, dialogConfig).afterClosed().subscribe(value => {
      if (value) {
        console.warn(this.elementForm.value);
        this.modaliteState.dispatch(new UpdateModaliteRequest({modalite: this.elementForm.value}));
      }
    });
  }

  close() {
    this.dialogRef.close(false);
  }

}
