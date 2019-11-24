import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {Actions, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {map} from 'rxjs/operators';
import {ConfirmComponent} from '../../../../layouts/alerts/confirm/confirm.component';
import {SocieteState} from '../../store/societe.reducer';
import {selectSocieteIsLoadingSpinner} from '../../store/societe.selectors';
import {LoadOneSocieteSuccess, SocieteActionTypes, UpdateSocieteRequest} from '../../store/societe.actions';

@Component({
  selector: 'app-dialog-update-societe',
  templateUrl: './dialog-update-societe.component.html',
  styleUrls: ['./dialog-update-societe.component.scss']
})
export class DialogUpdateSocieteComponent implements OnInit, OnDestroy {

  elementForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    nom: new FormControl('', [Validators.required]),
  });
  isLoadingSpinnerSubscription: Subscription;
  loadOneSocieteSuccessSubscription: Subscription;
  updateSocieteSuccessSubscription: Subscription;
  isLoadingSpinner: boolean;

  constructor(public dialogRef: MatDialogRef<DialogUpdateSocieteComponent>,
              // @Inject(MAT_DIALOG_DATA) public data: { id: number },
              private  updates$: Actions,
              private societeState: Store<SocieteState>,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.loadOneSocieteSuccessSubscription = this.updates$.pipe(ofType(
      SocieteActionTypes.LoadOneSocieteSuccess), map((action: LoadOneSocieteSuccess) => {
        this.elementForm.setValue({
          id: action.payload.societe.id,
          nom: action.payload.societe.nom
        });
        // this.dialogRef.close(false);
      })
    ).subscribe();

    this.updateSocieteSuccessSubscription = this.updates$.pipe(ofType(
      SocieteActionTypes.UpdateSocieteSuccess), map((action: LoadOneSocieteSuccess) => {
        this.dialogRef.close(false);
      })
    ).subscribe();
    this.isLoadingSpinnerSubscription = this.societeState.select(selectSocieteIsLoadingSpinner).subscribe(value => {
      this.isLoadingSpinner = value;
    });
  }

  ngOnDestroy(): void {
    this.isLoadingSpinnerSubscription.unsubscribe();
    this.loadOneSocieteSuccessSubscription.unsubscribe();
    this.updateSocieteSuccessSubscription.unsubscribe();
  }

  save() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '440px';
    dialogConfig.data = {titre: 'Modification', body: 'Voulez-vous enregistrer la modification ?'};
    this.dialog.open(ConfirmComponent, dialogConfig).afterClosed().subscribe(value => {
      if (value) {
        console.warn(this.elementForm.value);
        this.societeState.dispatch(new UpdateSocieteRequest({societe: this.elementForm.value}));
      }
    });
  }

  close() {
    this.dialogRef.close(false);
  }

}
