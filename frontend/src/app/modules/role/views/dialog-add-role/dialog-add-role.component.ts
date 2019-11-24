import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {RoleState} from '../../store/role.reducer';
import {RoleActionTypes, SaveRoleRequest} from '../../store/role.actions';
import {MatDialog, MatDialogConfig, MatDialogRef, MatSnackBar} from '@angular/material';
import {ConfirmComponent} from '../../../../layouts/alerts/confirm/confirm.component';
import {Observable, Subscription} from 'rxjs';
import {selectRoleIsLoadingSpinner} from '../../store/role.selectors';
import {Actions, ofType} from '@ngrx/effects';
import {map, takeUntil} from 'rxjs/operators';
import {selectAllPermissions} from '../../../permission/store/permission.selectors';
import {Permission} from '../../../permission/model/permission';
import {Pivot} from '../../../permission/model/pivot';
import {LoadPermissionsIsNotLoadedRequest} from '../../../permission/store/permission.actions';
import {selectIsLoading} from '../../../../root-state/root.selector';

@Component({
  selector: 'app-model-add-role',
  templateUrl: './dialog-add-role.component.html',
  styleUrls: ['./dialog-add-role.component.scss']
})
export class DialogAddRoleComponent implements OnInit, OnDestroy {
  elementForm = new FormGroup({
    nom: new FormControl('', [Validators.required]),
  });
  isLoadingSpinner: boolean;
  isLoadingSpinnerSubscription: Subscription;
  selectAllPermissionsSubscription: Subscription;
  updatesSubscription: Subscription;
  permissions: Permission[];
  permissionMap: Map<number, Pivot> = new Map<number, Pivot>();
   isLoading: Observable<boolean>;

  constructor(public dialogRef: MatDialogRef<DialogAddRoleComponent>,
              private roleState: Store<RoleState>,
              private snackBar: MatSnackBar,
              private  updates$: Actions,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.selectAllPermissionsSubscription = this.roleState.select(selectAllPermissions).subscribe(value => {
      this.permissions = value.map(value1 => ({...value1, pivot: new Pivot()}));
    });
    this.isLoadingSpinnerSubscription = this.roleState.select(selectRoleIsLoadingSpinner).subscribe(value => {
      this.isLoadingSpinner = value;
    });
    this.roleState.dispatch(new LoadPermissionsIsNotLoadedRequest());
    this.isLoading = this.roleState.select(selectIsLoading);
    this.updatesSubscription = this.updates$.pipe(ofType(
      RoleActionTypes.SaveRoleSuccess), map(value => {
        this.dialogRef.close(false);
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.selectAllPermissionsSubscription.unsubscribe();
    this.isLoadingSpinnerSubscription.unsubscribe();
    this.updatesSubscription.unsubscribe();
  }

  save() {
    // console.warn({...this.elementForm.value, permissions: this.permissionMap});
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '440px';
    dialogConfig.data = {titre: 'Ajout', body: 'Voulez-vous Entregistrer ?'};
    this.dialog.open(ConfirmComponent, dialogConfig).afterClosed().subscribe(value => {
      if (value) {
        this.roleState.dispatch(new SaveRoleRequest({role: {nom: this.elementForm.value.nom, permissions: this.permissions}}));
      }
    });
  }

  reset() {
    this.elementForm.setValue({nom: ''});
  }
}
