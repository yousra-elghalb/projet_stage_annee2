import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {MatDialog, MatDialogConfig, MatDialogRef, MatSnackBar} from '@angular/material';
import {Store} from '@ngrx/store';
import {CommercialState} from '../../store/commercial.reducer';
import {Actions, ofType} from '@ngrx/effects';
import {selectCommercialIsLoadingSpinner} from '../../store/commercial.selectors';
import {CommercialActionTypes, SaveCommercialRequest} from '../../store/commercial.actions';
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
  selector: 'app-dialog-add-commercial',
  templateUrl: './dialog-add-commercial.component.html',
  styleUrls: ['./dialog-add-commercial.component.scss']
})
export class DialogAddCommercialComponent implements OnInit, OnDestroy {
  elementForm = new FormGroup({
    password: new FormControl('', [Validators.required]),
    limitedAccess: new FormControl(false, []),
    roles: new FormControl('', [Validators.required]),
    nom: new FormControl('', [Validators.required]),
    prenom: new FormControl('', [Validators.required]),
    cin: new FormControl('', [Validators.required]),
    tel: new FormControl('', [Validators.required]),
    srcImg: new FormControl('', []),
    agence_id: new FormControl('', []),
    email: new FormControl('', [Validators.email, Validators.required]),
  });
  isLoadingSpinner: boolean;
  isLoadingSpinnerSubscription: Subscription;
  updatesSubscription: Subscription;
  role$: Observable<Role[]>;
  isLoadin: Observable<boolean>;
  agences: Observable<Agence[]>;
  userPermission: Observable<UserPermissions>;
  srcImgBase64: string;
  srcImg: string;

  constructor(public dialogRef: MatDialogRef<DialogAddCommercialComponent>,
              private commercialState: Store<CommercialState>,
              private snackBar: MatSnackBar,
              private  updates$: Actions,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.userPermission = this.commercialState.select(selectUserPermissions);

    this.commercialState.dispatch(new LoadRolesIsNotLoadedRequest());
    this.isLoadingSpinnerSubscription = this.commercialState.select(selectCommercialIsLoadingSpinner).subscribe(value => {
      this.isLoadingSpinner = value;
    });
    this.commercialState.dispatch(new LoadAgencesIsNotLoadedRequest());
    this.agences = this.commercialState.select(selectAllAgences);
    this.isLoadin = this.commercialState.select(selectIsLoading);
    this.role$ = this.commercialState.select(selectAllRoles);
    this.updatesSubscription = this.updates$.pipe(ofType(
      CommercialActionTypes.SaveCommercialSuccess), map(value => {
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
        this.commercialState.dispatch(new SaveCommercialRequest(
          {commercial: {...this.elementForm.value, srcImg: this.srcImg}}));
      }
    });
  }

  reset() {
    this.elementForm.setValue({nom: ''});
  }

  addRole() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.dialog.open(DialogAddRoleComponent, dialogConfig);
  }

  addAgence() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.dialog.open(DialogAddAgenceComponent, dialogConfig);
  }

  OnChangeImage() {
    this.handleFileSelect(this.elementForm.value.srcImg._files[0]);
  }

  handleFileSelect(f): any {
    const reader = new FileReader();
    reader.readAsDataURL(f);
    reader.onload = (e) => {
      if (typeof reader.result === 'string') {
        this.srcImgBase64 = reader.result.split(',')[1];
        this.srcImg = reader.result;
      }
    };
  }
}
