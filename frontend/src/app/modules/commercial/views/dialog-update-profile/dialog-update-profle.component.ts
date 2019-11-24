import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {Actions, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {map} from 'rxjs/operators';
import {ConfirmComponent} from '../../../../layouts/alerts/confirm/confirm.component';
import {CommercialState} from '../../store/commercial.reducer';
import {selectCommercialIsLoadingSpinner} from '../../store/commercial.selectors';
import {
  LoadOneCommercialSuccess,
  CommercialActionTypes,
  UpdateCommercialRequest,
  UpdateCommercialProfileRequest
} from '../../store/commercial.actions';
import {selectAllRoles} from '../../../role/store/role.selectors';
import {Role} from '../../../role/model/role';
import {DialogAddRoleComponent} from '../../../role/views/dialog-add-role/dialog-add-role.component';
import {selectIsLoading} from '../../../../root-state/root.selector';
import {LoadRolesIsNotLoadedRequest} from '../../../role/store/role.actions';
import {LoadAgencesIsNotLoadedRequest} from '../../../agence/store/agence.actions';
import {selectAllAgences} from '../../../agence/store/agence.selectors';
import {Agence} from '../../../agence/model/Agence';
import {DialogAddAgenceComponent} from '../../../agence/views/dialog-add-agence/dialog-add-agence.component';
import {selectUserPermissions} from '../../../user/store/user.selectors';
import {UserPermissions} from '../../../user/model/user-permissions';

@Component({
  selector: 'app-dialog-update-profle',
  templateUrl: './dialog-update-profle.component.html',
  styleUrls: ['./dialog-update-profle.component.scss']
})
export class DialogUpdateProfleComponent implements OnInit, OnDestroy {

  elementForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    nom: new FormControl('', [Validators.required]),
    prenom: new FormControl('', [Validators.required]),
    cin: new FormControl('', [Validators.required]),
    tel: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email]),
    srcImg: new FormControl('', []),
  });
  isLoadingSpinnerSubscription: Subscription;
  loadOneCommercialSuccessSubscription: Subscription;
  updateCommercialSuccessSubscription: Subscription;
  isLoadingSpinner: boolean;
  role$: Observable<Role[]>;
  isLoadin: Observable<boolean>;
  agences: Observable<Agence[]>;
  userPermission: Observable<UserPermissions>;
  srcImgBase64: string;
  srcImg: string;

  constructor(public dialogRef: MatDialogRef<DialogUpdateProfleComponent>,
              // @Inject(MAT_DIALOG_DATA) public data: { id: number },
              private  updates$: Actions,
              private commercialState: Store<CommercialState>,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.isLoadin = this.commercialState.select(selectIsLoading);
    this.userPermission = this.commercialState.select(selectUserPermissions);
    this.loadOneCommercialSuccessSubscription = this.updates$.pipe(ofType(
      CommercialActionTypes.LoadOneCommercialSuccess), map((action: LoadOneCommercialSuccess) => {
        this.elementForm.patchValue({
          id: action.payload.commercial.id,
          nom: action.payload.commercial.nom,
          prenom: action.payload.commercial.prenom,
          cin: action.payload.commercial.cin,
          tel: action.payload.commercial.tel,
          email: action.payload.commercial.email,
          srcImg: action.payload.commercial.srcImg,
        });
        this.srcImg = action.payload.commercial.srcImg;
        // this.dialogRef.close(false);
      })
    ).subscribe();

    this.updateCommercialSuccessSubscription = this.updates$.pipe(ofType(
      CommercialActionTypes.UpdateCommercialSuccess), map((action: LoadOneCommercialSuccess) => {
        this.dialogRef.close(false);
      })
    ).subscribe();
    this.isLoadingSpinnerSubscription = this.commercialState.select(selectCommercialIsLoadingSpinner).subscribe(value => {
      this.isLoadingSpinner = value;
    });
  }

  ngOnDestroy(): void {
    this.isLoadingSpinnerSubscription.unsubscribe();
    this.loadOneCommercialSuccessSubscription.unsubscribe();
    this.updateCommercialSuccessSubscription.unsubscribe();
  }

  save() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '440px';
    dialogConfig.data = {titre: 'Modification', body: 'Voulez-vous enregistrer la modification ?'};
    this.dialog.open(ConfirmComponent, dialogConfig).afterClosed().subscribe(value => {
      if (value) {
        console.warn(this.elementForm.value);
        this.commercialState.dispatch(new UpdateCommercialProfileRequest({
          commercial: {...this.elementForm.value, srcImg: this.srcImg}
        }));
      }
    });
  }

  close() {
    this.dialogRef.close(false);
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
