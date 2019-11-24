import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {MatDialog, MatDialogConfig, MatDialogRef, MatSnackBar} from '@angular/material';
import {Store} from '@ngrx/store';
import {VilleState} from '../../store/ville.reducer';
import {Actions, ofType} from '@ngrx/effects';
import {selectVilleIsLoadingSpinner} from '../../store/ville.selectors';
import {VilleActionTypes, SaveVilleRequest} from '../../store/ville.actions';
import {map} from 'rxjs/operators';
import {ConfirmComponent} from '../../../../layouts/alerts/confirm/confirm.component';
import {Pays} from '../../../pays/model/pays';
import {selectAllPayss} from '../../../pays/store/pays.selectors';
import {DialogAddSousCategorieComponent} from '../../../sous-categorie/views/dialog-add-sous-categorie/dialog-add-sous-categorie.component';
import {DialogAddPaysComponent} from '../../../pays/views/dialog-add-pays/dialog-add-pays.component';
import {selectUserPermissions} from '../../../user/store/user.selectors';
import {UserPermissions} from '../../../user/model/user-permissions';

@Component({
  selector: 'app-dialog-add-ville',
  templateUrl: './dialog-add-ville.component.html',
  styleUrls: ['./dialog-add-ville.component.scss']
})
export class DialogAddVilleComponent implements OnInit, OnDestroy {
  elementForm = new FormGroup({
    nom: new FormControl('', [Validators.required]),
    pays_id: new FormControl('', [Validators.required]),
  });
  isLoadingSpinner: boolean;
  isLoadingSpinnerSubscription: Subscription;
  updatesSubscription: Subscription;
  $pays: Observable<Pays[]>;
  userPermission: Observable<UserPermissions>;

  constructor(public dialogRef: MatDialogRef<DialogAddVilleComponent>,
              private villeState: Store<VilleState>,
              private snackBar: MatSnackBar,
              private  updates$: Actions,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.userPermission = this.villeState.select(selectUserPermissions);
    this.isLoadingSpinnerSubscription = this.villeState.select(selectVilleIsLoadingSpinner).subscribe(value => {
      this.isLoadingSpinner = value;
    });
    this.updatesSubscription = this.updates$.pipe(ofType(
      VilleActionTypes.SaveVilleSuccess), map(value => {
        this.dialogRef.close(false);
      })
    ).subscribe();
    this.$pays = this.villeState.select(selectAllPayss);
  }

  ngOnDestroy(): void {
    this.isLoadingSpinnerSubscription.unsubscribe();
    this.updatesSubscription.unsubscribe();
  }

  save() {
    console.warn(this.elementForm.value);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '440px';
    dialogConfig.data = {titre: 'Ajout', body: 'Voulez-vous Entregistrer ?'};
    this.dialog.open(ConfirmComponent, dialogConfig).afterClosed().subscribe(value => {
      if (value) {
        this.villeState.dispatch(new SaveVilleRequest({ville: this.elementForm.value}));
      }
    });
  }

  reset() {
    this.elementForm.setValue({nom: '', pays: {}});
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
