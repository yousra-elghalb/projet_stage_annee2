import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {Actions, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {map} from 'rxjs/operators';
import {ConfirmComponent} from '../../../../layouts/alerts/confirm/confirm.component';
import {VehiculeState} from '../../store/vehicule.reducer';
import {selectVehiculeIsLoadingSpinner} from '../../store/vehicule.selectors';
import {LoadOneVehiculeSuccess, VehiculeActionTypes, UpdateVehiculeRequest} from '../../store/vehicule.actions';
import {selectIsLoading} from '../../../../root-state/root.selector';
import {LoadTypeVehiculesIsNotLoadedRequest} from '../../../type-vehicule/store/type-vehicule.actions';
import {LoadMarqueVehiculesIsNotLoadedRequest} from '../../../marque-vehicule/store/marque-vehicule.actions';
import {LoadSocietesIsNotLoadedRequest} from '../../../societe/store/societe.actions';
import {selectAllMarqueVehicules} from '../../../marque-vehicule/store/marque-vehicule.selectors';
import {selectAllTypeVehicules} from '../../../type-vehicule/store/type-vehicule.selectors';
import {selectAllSocietes} from '../../../societe/store/societe.selectors';
import {MarqueVehicule} from '../../../marque-vehicule/model/marque-vehicule';
import {Societe} from '../../../societe/model/societe';
import {TypeVehicule} from '../../../type-vehicule/model/type-vehicule';
import {selectUserPermissions} from '../../../user/store/user.selectors';
import {UserPermissions} from '../../../user/model/user-permissions';
import {DialogAddTypeVehiculeComponent} from '../../../type-vehicule/views/dialog-add-type-vehicule/dialog-add-type-vehicule.component';
// tslint:disable-next-line:max-line-length
import {DialogAddMarqueVehiculeComponent} from '../../../marque-vehicule/views/dialog-add-marque-vehicule/dialog-add-marque-vehicule.component';
import {DialogAddSocieteComponent} from '../../../societe/views/dialog-add-societe/dialog-add-societe.component';

@Component({
  selector: 'app-dialog-update-vehicule',
  templateUrl: './dialog-update-vehicule.component.html',
  styleUrls: ['./dialog-update-vehicule.component.scss']
})
export class DialogUpdateVehiculeComponent implements OnInit, OnDestroy {

  elementForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    place: new FormControl('', [Validators.required]),
    date_ex_assurance: new FormControl('', [Validators.required]),
    immatriculation: new FormControl('', [Validators.required]),
    type_vehicule_id: new FormControl('', [Validators.required]),
    marque_vehicule_id: new FormControl('', [Validators.required]),
    societe_id: new FormControl('', []),
  });
  isLoadingSpinnerSubscription: Subscription;
  loadOneVehiculeSuccessSubscription: Subscription;
  updateVehiculeSuccessSubscription: Subscription;
  isLoadingSpinner: boolean;
  selectIsLoading: Observable<boolean>;
  marqueVehicules$: Observable<MarqueVehicule[]>;
  societe$: Observable<Societe[]>;
  typeVehicules$: Observable<TypeVehicule[]>;
  userPermission: Observable<UserPermissions>;

  constructor(public dialogRef: MatDialogRef<DialogUpdateVehiculeComponent>,
              // @Inject(MAT_DIALOG_DATA) public data: { id: number },
              private  updates$: Actions,
              private vehiculeState: Store<VehiculeState>,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.loadOneVehiculeSuccessSubscription = this.updates$.pipe(ofType(
      VehiculeActionTypes.LoadOneVehiculeSuccess), map((action: LoadOneVehiculeSuccess) => {
        this.elementForm.setValue({
          id: action.payload.vehicule.id,
          date_ex_assurance: action.payload.vehicule.date_ex_assurance,
          immatriculation: action.payload.vehicule.immatriculation,
          marque_vehicule_id: action.payload.vehicule.marque_vehicule_id,
          place: action.payload.vehicule.place,
          societe_id: action.payload.vehicule.societe_id,
          type_vehicule_id: action.payload.vehicule.type_vehicule_id,
        });
        // this.dialogRef.close(false);
      })
    ).subscribe();
    this.vehiculeState.dispatch(new LoadTypeVehiculesIsNotLoadedRequest());
    this.vehiculeState.dispatch(new LoadMarqueVehiculesIsNotLoadedRequest());
    this.vehiculeState.dispatch(new LoadSocietesIsNotLoadedRequest());
    this.marqueVehicules$ = this.vehiculeState.select(selectAllMarqueVehicules);
    this.typeVehicules$ = this.vehiculeState.select(selectAllTypeVehicules);
    this.societe$ = this.vehiculeState.select(selectAllSocietes);
    this.selectIsLoading = this.vehiculeState.select(selectIsLoading);
    this.userPermission = this.vehiculeState.select(selectUserPermissions);


    this.updateVehiculeSuccessSubscription = this.updates$.pipe(ofType(
      VehiculeActionTypes.UpdateVehiculeSuccess), map((action: LoadOneVehiculeSuccess) => {
        this.dialogRef.close(false);
      })
    ).subscribe();
    this.isLoadingSpinnerSubscription = this.vehiculeState.select(selectVehiculeIsLoadingSpinner).subscribe(value => {
      this.isLoadingSpinner = value;
    });
  }

  ngOnDestroy(): void {
    this.isLoadingSpinnerSubscription.unsubscribe();
    this.loadOneVehiculeSuccessSubscription.unsubscribe();
    this.updateVehiculeSuccessSubscription.unsubscribe();
  }

  save() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '440px';
    dialogConfig.data = {titre: 'Modification', body: 'Voulez-vous enregistrer la modification ?'};
    this.selectIsLoading = this.vehiculeState.select(selectIsLoading);
    this.dialog.open(ConfirmComponent, dialogConfig).afterClosed().subscribe(value => {
      if (value) {
        console.warn(this.elementForm.value);
        this.vehiculeState.dispatch(new UpdateVehiculeRequest({vehicule: this.elementForm.value}));
      }
    });
  }

  close() {
    this.dialogRef.close(false);
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
