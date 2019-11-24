import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {Actions, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {map} from 'rxjs/operators';
import {ConfirmComponent} from '../../../../layouts/alerts/confirm/confirm.component';
import {ChauffeurState} from '../../store/chauffeur.reducer';
import {selectChauffeurIsLoadingSpinner} from '../../store/chauffeur.selectors';
import {LoadOneChauffeurSuccess, ChauffeurActionTypes, UpdateChauffeurRequest} from '../../store/chauffeur.actions';

@Component({
  selector: 'app-dialog-update-chauffeur',
  templateUrl: './dialog-update-chauffeur.component.html',
  styleUrls: ['./dialog-update-chauffeur.component.scss']
})
export class DialogUpdateChauffeurComponent implements OnInit, OnDestroy {

  elementForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    nom: new FormControl('', [Validators.required]),
    prenom: new FormControl('', [Validators.required]),
    cin: new FormControl('', [Validators.required]),
    tel: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email]),
  });
  isLoadingSpinnerSubscription: Subscription;
  loadOneChauffeurSuccessSubscription: Subscription;
  updateChauffeurSuccessSubscription: Subscription;
  isLoadingSpinner: boolean;

  constructor(public dialogRef: MatDialogRef<DialogUpdateChauffeurComponent>,
              // @Inject(MAT_DIALOG_DATA) public data: { id: number },
              private  updates$: Actions,
              private chauffeurState: Store<ChauffeurState>,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.loadOneChauffeurSuccessSubscription = this.updates$.pipe(ofType(
      ChauffeurActionTypes.LoadOneChauffeurSuccess), map((action: LoadOneChauffeurSuccess) => {
        this.elementForm.setValue({
          id: action.payload.chauffeur.id,
          nom: action.payload.chauffeur.nom,
          prenom: action.payload.chauffeur.prenom,
          cin: action.payload.chauffeur.cin,
          tel: action.payload.chauffeur.tel,
          email: action.payload.chauffeur.email,
        });
        // this.dialogRef.close(false);
      })
    ).subscribe();

    this.updateChauffeurSuccessSubscription = this.updates$.pipe(ofType(
      ChauffeurActionTypes.UpdateChauffeurSuccess), map((action: LoadOneChauffeurSuccess) => {
        this.dialogRef.close(false);
      })
    ).subscribe();
    this.isLoadingSpinnerSubscription = this.chauffeurState.select(selectChauffeurIsLoadingSpinner).subscribe(value => {
      this.isLoadingSpinner = value;
    });
  }

  ngOnDestroy(): void {
    this.isLoadingSpinnerSubscription.unsubscribe();
    this.loadOneChauffeurSuccessSubscription.unsubscribe();
    this.updateChauffeurSuccessSubscription.unsubscribe();
  }

  save() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '440px';
    dialogConfig.data = {titre: 'Modification', body: 'Voulez-vous enregistrer la modification ?'};
    this.dialog.open(ConfirmComponent, dialogConfig).afterClosed().subscribe(value => {
      if (value) {
        console.warn(this.elementForm.value);
        this.chauffeurState.dispatch(new UpdateChauffeurRequest({chauffeur: this.elementForm.value}));
      }
    });
  }

  close() {
    this.dialogRef.close(false);
  }

}
