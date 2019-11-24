import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {ConfirmComponent} from '../../../../layouts/alerts/confirm/confirm.component';
import {Store} from '@ngrx/store';
import {RoleState} from '../../store/role.reducer';
import {LoadOneRoleSuccess, RoleActionTypes, SaveRoleRequest, UpdateRoleRequest} from '../../store/role.actions';
import {Role} from '../../model/role';
import {selectRoleIsLoadingSpinner} from '../../store/role.selectors';
import {Observable, Subscription} from 'rxjs';
import {Actions, ofType} from '@ngrx/effects';
import {map} from 'rxjs/operators';
import {Permission} from '../../../permission/model/permission';
import {LoadPermissionsIsNotLoadedRequest} from '../../../permission/store/permission.actions';
import {selectIsLoading} from '../../../../root-state/root.selector';

@Component({
  selector: 'app-dialog-update-role',
  templateUrl: './dialog-update-role.component.html',
  styleUrls: ['./dialog-update-role.component.scss']
})
export class DialogUpdateRoleComponent implements OnInit, OnDestroy {
  elementForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    nom: new FormControl('', [Validators.required]),
  });
  isLoadingSpinnerSubscription: Subscription;
  loadOneRoleSuccessSubscription: Subscription;
  updateRoleSuccessSubscription: Subscription;
  isLoadingSpinner: boolean;
  permissions: Permission[];
  isLoading: Observable<boolean>;

  constructor(public dialogRef: MatDialogRef<DialogUpdateRoleComponent>,
              // @Inject(MAT_DIALOG_DATA) public data: { id: number },
              private  updates$: Actions,
              private roleState: Store<RoleState>,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.roleState.dispatch(new LoadPermissionsIsNotLoadedRequest());
    this.isLoading = this.roleState.select(selectIsLoading);
    this.loadOneRoleSuccessSubscription = this.updates$.pipe(ofType(
      RoleActionTypes.LoadOneRoleSuccess), map((action: LoadOneRoleSuccess) => {
        this.elementForm.setValue({
          id: action.payload.role.id,
          nom: action.payload.role.nom
        });
        this.permissions = action.payload.role.permissions.map(value => ({
          ...value,
          pivot: {
            edit: value.pivot.edit,
            read: value.pivot.read,
            delete: value.pivot.delete
          }
        }));
        // this.dialogRef.close(false);
      })
    ).subscribe();

    this.updateRoleSuccessSubscription = this.updates$.pipe(ofType(
      RoleActionTypes.UpdateRoleSuccess), map((action: LoadOneRoleSuccess) => {
        this.dialogRef.close(false);
      })
    ).subscribe();
    this.isLoadingSpinnerSubscription = this.roleState.select(selectRoleIsLoadingSpinner).subscribe(value => {
      this.isLoadingSpinner = value;
    });
  }

  ngOnDestroy(): void {
    this.isLoadingSpinnerSubscription.unsubscribe();
    this.loadOneRoleSuccessSubscription.unsubscribe();
    this.updateRoleSuccessSubscription.unsubscribe();
  }

  save() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '440px';
    dialogConfig.data = {titre: 'Modification', body: 'Voulez-vous enregistrer la modification ?'};
    this.dialog.open(ConfirmComponent, dialogConfig).afterClosed().subscribe(value => {
      if (value) {
        console.warn(this.elementForm.value);
        this.roleState.dispatch(new UpdateRoleRequest({role: {...this.elementForm.value, permissions: this.permissions}}));
      }
    });
  }

  close() {
    this.dialogRef.close(false);
  }
}
