import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {OffreVoyageState} from '../../store/offre-voyage.reducer';
import {OffreVoyageActionTypes, SaveOffreVoyageRequest} from '../../store/offre-voyage.actions';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef, MatSnackBar} from '@angular/material';
import {ConfirmComponent} from '../../../../layouts/alerts/confirm/confirm.component';
import {Observable, Subscription} from 'rxjs';
import {Actions, ofType} from '@ngrx/effects';
import {map, takeUntil} from 'rxjs/operators';
import {selectOffreVoyageIsLoadingSpinner} from '../../store/offre-voyage.selectors';
import {selectAgenceIsLoading, selectAllAgences} from '../../../agence/store/agence.selectors';
import {Agence} from '../../../agence/model/Agence';
import {LoadAgencesIsNotLoadedRequest} from '../../../agence/store/agence.actions';
import {DialogAddAgenceComponent} from '../../../agence/views/dialog-add-agence/dialog-add-agence.component';
import {DialogAddAccompagnateurComponent} from '../../../accompagnateur/views/dialog-add-accompagnateur/dialog-add-accompagnateur.component';
import {selectAccompagnateurIsLoading, selectAllAccompagnateurs} from '../../../accompagnateur/store/accompagnateur.selectors';
import {Accompagnateur} from '../../../accompagnateur/model/accompagnateur';
import {LoadAccompagnateursIsNotLoadedRequest} from '../../../accompagnateur/store/accompagnateur.actions';
import {selectUserPermissions} from '../../../user/store/user.selectors';
import {UserPermissions} from '../../../user/model/user-permissions';
import {selectAllVehicules} from '../../../vehicule/store/vehicule.selectors';
import {Vehicule} from '../../../vehicule/model/vehicule';
import {LoadVehiculesIsNotLoadedRequest} from '../../../vehicule/store/vehicule.actions';
import {selectIsLoading} from '../../../../root-state/root.selector';
import {DialogAddVehiculeComponent} from '../../../vehicule/views/dialog-add-vehicule/dialog-add-vehicule.component';
import {LoadChauffeursIsNotLoadedRequest} from '../../../chauffeur/store/chauffeur.actions';
import {selectAllChauffeurs} from '../../../chauffeur/store/chauffeur.selectors';
import {Chauffeur} from '../../../chauffeur/model/chauffeur';
import {DialogAddChauffeurComponent} from '../../../chauffeur/views/dialog-add-chauffeur/dialog-add-chauffeur.component';

@Component({
  selector: 'app-model-add-offre-voyage',
  templateUrl: './dialog-add-offre-voyage.component.html',
  styleUrls: ['./dialog-add-offre-voyage.component.scss']
})
export class DialogAddOffreVoyageComponent implements OnInit, OnDestroy {
  elementForm: FormGroup;
  isLoadingSpinner: boolean;
  isLoadingSpinnerSubscription: Subscription;
  selectAllPermissionsSubscription: Subscription;
  updatesSubscription: Subscription;
  agences: Observable<Agence[]>;
  accompagnateurs: Observable<Accompagnateur[]>;
  isLoading: Observable<boolean>;
  userPermission: Observable<UserPermissions>;
  vehicules: Observable<Vehicule[]>;
  chauffeurs: Observable<Chauffeur[]>;

  constructor(public dialogRef: MatDialogRef<DialogAddOffreVoyageComponent>,
              private offreVoyageState: Store<OffreVoyageState>,
              private snackBar: MatSnackBar,
              private  updates$: Actions,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dialog: MatDialog,
              private fb: FormBuilder) {
    this.elementForm = this.fb.group({
      offreVoyages: this.fb.array([this.newFormGroupOffreVoyage()]),
    });
  }

  newFormGroupOffreVoyage(): FormGroup {
    return this.fb.group({
      dateDepart: this.fb.control('', [Validators.required]),
      dateDarrive: this.fb.control('', [Validators.required]),
      statut: this.fb.control('active', [Validators.required]),
      suffixe: this.fb.control('', [Validators.required]),
      groupe: this.fb.control(false, []),
      agence_id: this.fb.control('', []),
      vehicule_id: this.fb.control('', []),
      chauffeur_id: this.fb.control('', []),
      accompagnateur_ids: this.fb.control('', [Validators.required]),
      voyage_id: this.fb.control(this.data.id),
      prixAdulte: this.fb.control(this.data.prixAdulte),
      prixEnfant: this.fb.control(this.data.prixEnfant),
      prixBebe: this.fb.control(this.data.prixBebe),
    });
  }

  addOffreVoyage() {
    const items = this.elementForm.get('offreVoyages') as FormArray;
    items.push(this.newFormGroupOffreVoyage());
  }

  removeOffreVoyage() {
    const items = this.elementForm.get('offreVoyages') as FormArray;
    if (items.length > 1) {
      items.removeAt(items.length - 1);

    }
  }

  ngOnInit() {
    this.userPermission = this.offreVoyageState.select(selectUserPermissions);
    this.isLoading = this.offreVoyageState.select(selectIsLoading);
    this.offreVoyageState.dispatch(new LoadAccompagnateursIsNotLoadedRequest());
    this.accompagnateurs = this.offreVoyageState.select(selectAllAccompagnateurs);
    this.offreVoyageState.dispatch(new LoadAgencesIsNotLoadedRequest());
    this.agences = this.offreVoyageState.select(selectAllAgences);
    this.offreVoyageState.dispatch(new LoadVehiculesIsNotLoadedRequest());
    this.vehicules = this.offreVoyageState.select(selectAllVehicules);
    this.offreVoyageState.dispatch(new LoadChauffeursIsNotLoadedRequest());
    this.chauffeurs = this.offreVoyageState.select(selectAllChauffeurs);
    this.isLoadingSpinnerSubscription = this.offreVoyageState.select(selectOffreVoyageIsLoadingSpinner).subscribe(value => {
      this.isLoadingSpinner = value;
    });
    this.updatesSubscription = this.updates$.pipe(ofType(
      OffreVoyageActionTypes.SaveOffreVoyageSuccess), map(value => {
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
    console.warn(this.elementForm.value);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '440px';
    dialogConfig.data = {titre: 'Ajout', body: 'Voulez-vous Entregistrer ?'};
    this.dialog.open(ConfirmComponent, dialogConfig).afterClosed().subscribe(value => {
      if (value) {
        this.offreVoyageState.dispatch(new SaveOffreVoyageRequest({
          offreVoyages: this.elementForm.value.offreVoyages
        }));
      }
    });
  }

  reset() {
  }

  addAgence() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.dialog.open(DialogAddAgenceComponent, dialogConfig);
  }

  addAccompagnateur() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.dialog.open(DialogAddAccompagnateurComponent, dialogConfig);
  }

  addVehicule() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.dialog.open(DialogAddVehiculeComponent, dialogConfig);
  }

  addChauffeur() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.dialog.open(DialogAddChauffeurComponent, dialogConfig);
  }
}
