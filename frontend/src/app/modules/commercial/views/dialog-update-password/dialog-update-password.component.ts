import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {MatDialog, MatDialogConfig, MatDialogRef, MatSnackBar} from '@angular/material';
import {Store} from '@ngrx/store';
import {CommercialState} from '../../store/commercial.reducer';
import {Actions, ofType} from '@ngrx/effects';
import {selectCommercialIsLoadingSpinner} from '../../store/commercial.selectors';
import {CommercialActionTypes, SaveCommercialRequest, UpdateCommercialchangePasswordRequest} from '../../store/commercial.actions';
import {map} from 'rxjs/operators';
import {ConfirmComponent} from '../../../../layouts/alerts/confirm/confirm.component';
import {Role} from '../../../role/model/role';
import {selectAllRoles} from '../../../role/store/role.selectors';
import {DialogAddRoleComponent} from '../../../role/views/dialog-add-role/dialog-add-role.component';
import {LoadRolesIsNotLoadedRequest} from '../../../role/store/role.actions';
import {selectIsLoading} from '../../../../root-state/root.selector';
import {DialogAddAgenceComponent} from '../../../agence/views/dialog-add-agence/dialog-add-agence.component';
import {LoadAgencesIsNotLoadedRequest} from '../../../agence/store/agence.actions';
import {selectAllAgences} from '../../../agence/store/agence.selectors';
import {Agence} from '../../../agence/model/Agence';
import {selectUserPermissions} from '../../../user/store/user.selectors';
import {UserPermissions} from '../../../user/model/user-permissions';


@Component({
  selector: 'app-dialog-update-password',
  templateUrl: './dialog-update-password.component.html',
  styleUrls: ['./dialog-update-password.component.scss']
})
export class DialogUpdatePasswordComponent implements OnInit, OnDestroy {
  elementForm = new FormGroup({
    oldPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required]),
    confirmNewpassword: new FormControl('', [Validators.required]),
  }, {validators: this.checkPasswords});
  isLoadingSpinner: boolean;
  isLoadingSpinnerSubscription: Subscription;
  updatesSubscription: Subscription;

  constructor(public dialogRef: MatDialogRef<DialogUpdatePasswordComponent>,
              private commercialState: Store<CommercialState>,
              private snackBar: MatSnackBar,
              private  updates$: Actions,
              private dialog: MatDialog) {
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    const pass = group.get('newPassword').value;
    const confirmPass = group.get('confirmNewpassword').value;

    return pass === confirmPass ? null : {notSame: true};
  }

  ngOnInit() {

    this.isLoadingSpinnerSubscription = this.commercialState.select(selectCommercialIsLoadingSpinner).subscribe(value => {
      this.isLoadingSpinner = value;
    });
    this.updatesSubscription = this.updates$.pipe(ofType(
      CommercialActionTypes.UpdateCommercialchangePasswordSuccess), map(value => {
        this.dialogRef.close(false);
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.isLoadingSpinnerSubscription.unsubscribe();
    this.updatesSubscription.unsubscribe();
  }

  save() {
    // console.log(this.elementForm.value);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '440px';
    dialogConfig.data = {titre: 'Ajout', body: 'Voulez-vous Entregistrer ?'};
    this.dialog.open(ConfirmComponent, dialogConfig).afterClosed().subscribe(value => {
      if (value) {
        this.commercialState.dispatch(new UpdateCommercialchangePasswordRequest(
          {user: {...this.elementForm.value}}));
      }
    });
  }

  reset() {
    this.elementForm.patchValue({nom: ''});
  }


}
