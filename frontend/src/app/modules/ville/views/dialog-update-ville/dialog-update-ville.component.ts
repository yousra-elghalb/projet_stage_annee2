import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {Actions, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {map} from 'rxjs/operators';
import {ConfirmComponent} from '../../../../layouts/alerts/confirm/confirm.component';
import {VilleState} from '../../store/ville.reducer';
import {selectVilleIsLoadingSpinner} from '../../store/ville.selectors';
import {LoadOneVilleSuccess, VilleActionTypes, UpdateVilleRequest} from '../../store/ville.actions';
import {selectAllPayss} from '../../../pays/store/pays.selectors';
import {Pays} from '../../../pays/model/pays';
import {DialogAddPaysComponent} from '../../../pays/views/dialog-add-pays/dialog-add-pays.component';
import {DialogAddVilleComponent} from '../dialog-add-ville/dialog-add-ville.component';
import {Ville} from '../../model/ville';
import {selectUserPermissions} from '../../../user/store/user.selectors';
import {UserPermissions} from '../../../user/model/user-permissions';

@Component({
  selector: 'app-dialog-update-ville',
  templateUrl: './dialog-update-ville.component.html',
  styleUrls: ['./dialog-update-ville.component.scss']
})
export class DialogUpdateVilleComponent implements OnInit, OnDestroy {

  elementForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    nom: new FormControl('', [Validators.required]),
    pays_id: new FormControl('', [Validators.required]),
  });
  isLoadingSpinnerSubscription: Subscription;
  loadOneVilleSuccessSubscription: Subscription;
  updateVilleSuccessSubscription: Subscription;
  isLoadingSpinner: boolean;
  $pays: Observable<Pays[]>;
  selectedPays = 1;
  userPermission: Observable<UserPermissions>;

  constructor(public dialogRef: MatDialogRef<DialogUpdateVilleComponent>,
              // @Inject(MAT_DIALOG_DATA) public data: { id: number },
              private  updates$: Actions,
              private villeState: Store<VilleState>,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.userPermission = this.villeState.select(selectUserPermissions);
    this.loadOneVilleSuccessSubscription = this.updates$.pipe(ofType(
      VilleActionTypes.LoadOneVilleSuccess), map((action: LoadOneVilleSuccess) => {
        // this.selectedPays = action.payload.ville.pays;
        this.elementForm.setValue({
          id: action.payload.ville.id,
          nom: action.payload.ville.nom,
          pays_id: action.payload.ville.pays.id
        });
        // this.dialogRef.close(false);
      })
    ).subscribe();

    this.updateVilleSuccessSubscription = this.updates$.pipe(ofType(
      VilleActionTypes.UpdateVilleSuccess), map((action: LoadOneVilleSuccess) => {
        this.dialogRef.close(false);
      })
    ).subscribe();
    this.isLoadingSpinnerSubscription = this.villeState.select(selectVilleIsLoadingSpinner).subscribe(value => {
      this.isLoadingSpinner = value;
    });
    this.$pays = this.villeState.select(selectAllPayss);
  }

  ngOnDestroy(): void {
    this.isLoadingSpinnerSubscription.unsubscribe();
    this.loadOneVilleSuccessSubscription.unsubscribe();
    this.updateVilleSuccessSubscription.unsubscribe();
  }

  save() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '440px';
    dialogConfig.data = {titre: 'Modification', body: 'Voulez-vous enregistrer la modification ?'};
    this.dialog.open(ConfirmComponent, dialogConfig).afterClosed().subscribe(value => {
      if (value) {
        console.warn(this.elementForm.value);
        this.villeState.dispatch(new UpdateVilleRequest({ville: this.elementForm.value}));
      }
    });
  }

  close() {
    this.dialogRef.close(false);
  }

  addPays() {
    this.dialogRef.close(false);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.dialog.open(DialogAddPaysComponent, dialogConfig).beforeClosed().subscribe(value => {
      this.dialog.open(DialogAddVilleComponent, dialogConfig);
    });
  }
}
