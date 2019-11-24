import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {MatDialog, MatDialogConfig, MatDialogRef, MatSnackBar} from '@angular/material';
import {Store} from '@ngrx/store';
import {VehiculeState} from '../../store/vehicule.reducer';
import {Actions, ofType} from '@ngrx/effects';
import {selectVehiculeIsLoadingSpinner} from '../../store/vehicule.selectors';
import {VehiculeActionTypes, SaveVehiculeRequest} from '../../store/vehicule.actions';
import {map} from 'rxjs/operators';
import {ConfirmComponent} from '../../../../layouts/alerts/confirm/confirm.component';
import {selectAllMarqueVehicules} from '../../../marque-vehicule/store/marque-vehicule.selectors';
import {selectAllSocietes} from '../../../societe/store/societe.selectors';
import {selectAllTypeVehicules} from '../../../type-vehicule/store/type-vehicule.selectors';
import {LoadTypeVehiculesIsNotLoadedRequest, LoadTypeVehiculesRequest} from '../../../type-vehicule/store/type-vehicule.actions';
import {LoadMarqueVehiculesIsNotLoadedRequest} from '../../../marque-vehicule/store/marque-vehicule.actions';
import {LoadSocietesIsNotLoadedRequest} from '../../../societe/store/societe.actions';
import {selectIsLoading} from '../../../../root-state/root.selector';
import {MarqueVehicule} from '../../../marque-vehicule/model/marque-vehicule';
import {Societe} from '../../../societe/model/societe';
import {TypeVehicule} from '../../../type-vehicule/model/type-vehicule';
import {DialogAddPaysComponent} from '../../../pays/views/dialog-add-pays/dialog-add-pays.component';
import {selectUserPermissions} from '../../../user/store/user.selectors';
import {UserPermissions} from '../../../user/model/user-permissions';
import {DialogAddTypeVehiculeComponent} from '../../../type-vehicule/views/dialog-add-type-vehicule/dialog-add-type-vehicule.component';
import {DialogAddMarqueVehiculeComponent} from '../../../marque-vehicule/views/dialog-add-marque-vehicule/dialog-add-marque-vehicule.component';
import {DialogAddSocieteComponent} from '../../../societe/views/dialog-add-societe/dialog-add-societe.component';

@Component({
  selector: 'app-dialog-add-vehicule',
  templateUrl: './dialog-add-vehicule.component.html',
  styleUrls: ['./dialog-add-vehicule.component.scss']
})
export class DialogAddVehiculeComponent implements OnInit, OnDestroy {
  elementForm = new FormGroup({
    place: new FormControl('', [Validators.required]),
    date_ex_assurance: new FormControl('', [Validators.required]),
    immatriculation: new FormControl('', [Validators.required]),
    type_vehicule_id: new FormControl('', [Validators.required]),
    marque_vehicule_id: new FormControl('', [Validators.required]),
    societe_id: new FormControl('', []),
  });

  isLoadingSpinner: boolean;
  isLoadingSpinnerSubscription: Subscription;
  updatesSubscription: Subscription;
  selectIsLoading: Observable<boolean>;
  marqueVehicules$: Observable<MarqueVehicule[]>;
  societe$: Observable<Societe[]>;
  typeVehicules$: Observable<TypeVehicule[]>;
  userPermission: Observable<UserPermissions>;

  constructor(public dialogRef: MatDialogRef<DialogAddVehiculeComponent>,
              private vehiculeState: Store<VehiculeState>,
              private snackBar: MatSnackBar,
              private  updates$: Actions,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.vehiculeState.dispatch(new LoadTypeVehiculesIsNotLoadedRequest());
    this.vehiculeState.dispatch(new LoadMarqueVehiculesIsNotLoadedRequest());
    this.vehiculeState.dispatch(new LoadSocietesIsNotLoadedRequest());
    this.marqueVehicules$ = this.vehiculeState.select(selectAllMarqueVehicules);
    this.typeVehicules$ = this.vehiculeState.select(selectAllTypeVehicules);
    this.societe$ = this.vehiculeState.select(selectAllSocietes);
    this.selectIsLoading = this.vehiculeState.select(selectIsLoading);
    this.userPermission = this.vehiculeState.select(selectUserPermissions);


    this.isLoadingSpinnerSubscription = this.vehiculeState.select(selectVehiculeIsLoadingSpinner).subscribe(value => {
      this.isLoadingSpinner = value;
    });
    this.updatesSubscription = this.updates$.pipe(ofType(
      VehiculeActionTypes.SaveVehiculeSuccess), map(value => {
        this.dialogRef.close(false);
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.isLoadingSpinnerSubscription.unsubscribe();
    this.updatesSubscription.unsubscribe();
  }

  save() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '440px';
    dialogConfig.data = {titre: 'Ajout', body: 'Voulez-vous Entregistrer ?'};
    this.dialog.open(ConfirmComponent, dialogConfig).afterClosed().subscribe(value => {
      if (value) {
        this.vehiculeState.dispatch(new SaveVehiculeRequest({vehicule: this.elementForm.value}));
      }
    });
  }

  reset() {
    this.elementForm.setValue({nom: ''});
  }

  addTypeVehicule() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.dialog.open(DialogAddTypeVehiculeComponent, dialogConfig);
  }

  addMarqueVehicule() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.dialog.open(DialogAddMarqueVehiculeComponent, dialogConfig);
  }

  addSociete() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.dialog.open(DialogAddSocieteComponent, dialogConfig);
  }
}
