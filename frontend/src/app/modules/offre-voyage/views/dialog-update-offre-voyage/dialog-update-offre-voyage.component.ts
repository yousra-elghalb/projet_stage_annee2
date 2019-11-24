import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {ConfirmComponent} from '../../../../layouts/alerts/confirm/confirm.component';
import {Store} from '@ngrx/store';
import {OffreVoyageState} from '../../store/offre-voyage.reducer';
import {
  LoadOneOffreVoyageSuccess,
  OffreVoyageActionTypes,
  SaveOffreVoyageRequest,
  UpdateOffreVoyageRequest
} from '../../store/offre-voyage.actions';
import {OffreVoyage} from '../../model/offre-voyage';
import {selectOffreVoyageIsLoadingSpinner} from '../../store/offre-voyage.selectors';
import {Observable, Subscription} from 'rxjs';
import {Actions, ofType} from '@ngrx/effects';
import {map} from 'rxjs/operators';
import {selectAgenceIsLoading, selectAllAgences} from '../../../agence/store/agence.selectors';
import {LoadAgencesIsNotLoadedRequest} from '../../../agence/store/agence.actions';
import {Agence} from '../../../agence/model/Agence';
import {selectAccompagnateurIsLoading, selectAllAccompagnateurs} from '../../../accompagnateur/store/accompagnateur.selectors';
import {Accompagnateur} from '../../../accompagnateur/model/accompagnateur';
// tslint:disable-next-line:max-line-length
import {DialogAddAccompagnateurComponent} from '../../../accompagnateur/views/dialog-add-accompagnateur/dialog-add-accompagnateur.component';
import {LoadAccompagnateursIsNotLoadedRequest} from '../../../accompagnateur/store/accompagnateur.actions';
import {DialogAddAgenceComponent} from '../../../agence/views/dialog-add-agence/dialog-add-agence.component';
import {selectUserPermissions} from '../../../user/store/user.selectors';
import {UserPermissions} from '../../../user/model/user-permissions';
import {Depense} from '../../../depense/model/depense';
import {DialogAddDepenseComponent} from '../../../depense/views/dialog-add-depense/dialog-add-depense.component';
import {selectAllDepenses} from '../../../depense/store/depense.selectors';
import {LoadDepensesIsNotLoadedRequest} from '../../../depense/store/depense.actions';
import {LoadChauffeursIsNotLoadedRequest} from '../../../chauffeur/store/chauffeur.actions';
import {selectAllChauffeurs, selectChauffeurIsLoading} from '../../../chauffeur/store/chauffeur.selectors';
import {Chauffeur} from '../../../chauffeur/model/chauffeur';
import {DialogAddChauffeurComponent} from '../../../chauffeur/views/dialog-add-chauffeur/dialog-add-chauffeur.component';
import {LoadVehiculesIsNotLoadedRequest} from '../../../vehicule/store/vehicule.actions';
import {selectAllVehicules} from '../../../vehicule/store/vehicule.selectors';
import {Vehicule} from '../../../vehicule/model/vehicule';
import {DialogAddVehiculeComponent} from '../../../vehicule/views/dialog-add-vehicule/dialog-add-vehicule.component';

@Component({
  selector: 'app-dialog-update-offre-voyage',
  templateUrl: './dialog-update-offre-voyage.component.html',
  styleUrls: ['./dialog-update-offre-voyage.component.scss']
})
export class DialogUpdateOffreVoyageComponent implements OnInit, OnDestroy {
  elementForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    dateDepart: new FormControl('', [Validators.required]),
    dateDarrive: new FormControl('', [Validators.required]),
    statut: new FormControl('active', [Validators.required]),
    suffixe: new FormControl('', [Validators.required]),
    groupe: new FormControl('', []),
    num_autorisation: new FormControl('', []),
    num_dossier: new FormControl('', []),
    agence_id: new FormControl('', []),
    chauffeur_id: new FormControl('', []),
    vehicule_id: new FormControl('', []),
    accompagnateur_ids: new FormControl('', [Validators.required]),
    depenses: new FormArray([]),
    prixAdulte: new FormControl(''),
    prixEnfant: new FormControl(''),
    prixBebe: new FormControl(''),
  });
  isLoadingSpinnerSubscription: Subscription;
  loadOneOffreVoyageSuccessSubscription: Subscription;
  updateOffreVoyageSuccessSubscription: Subscription;
  isLoadingSpinner: boolean;
  agencesIsLoading: Observable<boolean>;
  agences: Observable<Agence[]>;
  accompagnateursIsLoading: Observable<boolean>;
  accompagnateurs: Observable<Accompagnateur[]>;
  userPermission: Observable<UserPermissions>;
  depense: null;
  depenses$: Observable<Depense[]>;
  offreVoyage: OffreVoyage;
  chauffeurs: Observable<Chauffeur[]>;
  chauffeursIsLoading: Observable<boolean>;
  vehicules: Observable<Vehicule[]>;

  constructor(public dialogRef: MatDialogRef<DialogUpdateOffreVoyageComponent>,
              // @Inject(MAT_DIALOG_DATA) public data: { id: number },
              private  updates$: Actions,
              private offreVoyageState: Store<OffreVoyageState>,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.userPermission = this.offreVoyageState.select(selectUserPermissions);
    this.agencesIsLoading = this.offreVoyageState.select(selectAgenceIsLoading);
    this.offreVoyageState.dispatch(new LoadAgencesIsNotLoadedRequest());
    this.offreVoyageState.dispatch(new LoadDepensesIsNotLoadedRequest());
    this.accompagnateursIsLoading = this.offreVoyageState.select(selectAccompagnateurIsLoading);
    this.chauffeursIsLoading = this.offreVoyageState.select(selectChauffeurIsLoading);
    this.offreVoyageState.dispatch(new LoadAccompagnateursIsNotLoadedRequest());
    this.offreVoyageState.dispatch(new LoadVehiculesIsNotLoadedRequest());
    this.vehicules = this.offreVoyageState.select(selectAllVehicules);

    this.offreVoyageState.dispatch(new LoadChauffeursIsNotLoadedRequest());
    this.chauffeurs = this.offreVoyageState.select(selectAllChauffeurs);
    this.accompagnateurs = this.offreVoyageState.select(selectAllAccompagnateurs);
    this.agences = this.offreVoyageState.select(selectAllAgences);
    this.depenses$ = this.offreVoyageState.select(selectAllDepenses);
    this.loadOneOffreVoyageSuccessSubscription = this.updates$.pipe(ofType(
      OffreVoyageActionTypes.LoadOneOffreVoyageSuccess), map((action: LoadOneOffreVoyageSuccess) => {
        this.elementForm.patchValue({
          id: action.payload.offreVoyage.id,
          dateDepart: action.payload.offreVoyage.dateDepart,
          dateDarrive: action.payload.offreVoyage.dateDarrive,
          statut: action.payload.offreVoyage.statut,
          groupe: action.payload.offreVoyage.groupe,
          suffixe: action.payload.offreVoyage.suffixe,
          num_immatriculation: action.payload.offreVoyage.num_immatriculation,
          num_dossier: action.payload.offreVoyage.num_dossier,
          num_autorisation: action.payload.offreVoyage.num_autorisation,
          agence_id: action.payload.offreVoyage.agence_id,
          vehicule_id: action.payload.offreVoyage.vehicule_id,
          accompagnateur_ids: action.payload.offreVoyage.accompagnateurs.map(value => value.id),
          chauffeur_id: action.payload.offreVoyage.chauffeur_id,
          prixAdulte: action.payload.offreVoyage.voyage.prixAdulte,
          prixEnfant: action.payload.offreVoyage.voyage.prixEnfant,
          prixBebe: action.payload.offreVoyage.voyage.prixBebe,
        });
        this.offreVoyage = action.payload.offreVoyage;
        action.payload.offreVoyage.depenses.forEach(value => {
          this.addDepense({...value, prix: value.pivot.prix});
        });
      })
    ).subscribe();

    this.updateOffreVoyageSuccessSubscription = this.updates$.pipe(ofType(
      OffreVoyageActionTypes.UpdateOffreVoyageSuccess), map((action: LoadOneOffreVoyageSuccess) => {
        this.dialogRef.close(false);
      })
    ).subscribe();
    this.isLoadingSpinnerSubscription = this.offreVoyageState.select(selectOffreVoyageIsLoadingSpinner).subscribe(value => {
      this.isLoadingSpinner = value;
    });
  }

  ngOnDestroy(): void {
    this.isLoadingSpinnerSubscription.unsubscribe();
    this.loadOneOffreVoyageSuccessSubscription.unsubscribe();
    this.updateOffreVoyageSuccessSubscription.unsubscribe();
  }

  save() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '440px';
    dialogConfig.data = {titre: 'Modification', body: 'Voulez-vous enregistrer la modification ?'};
    this.dialog.open(ConfirmComponent, dialogConfig).afterClosed().subscribe(value => {
      if (value) {
        this.offreVoyageState.dispatch(new UpdateOffreVoyageRequest({
          offreVoyage: {
            ...this.elementForm.value
          }
        }));
      }
    });
  }

  close() {
    this.dialogRef.close(false);
  }

  addAccompagnateur() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.dialog.open(DialogAddAccompagnateurComponent, dialogConfig);
  }

  addAgence() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.dialog.open(DialogAddAgenceComponent, dialogConfig);
  }

  addChauffeur() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.dialog.open(DialogAddChauffeurComponent, dialogConfig);
  }

  addVehicule() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.dialog.open(DialogAddVehiculeComponent, dialogConfig);
  }

  newFormGroupDepense(o: Depense): FormGroup {
    return new FormGroup({
      id: new FormControl(o.id, [Validators.required]),
      nom: new FormControl(o.nom, [Validators.required]),
      prix: new FormControl(o.prix, [Validators.required, Validators.min(0), Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]),
    });
  }

  addDepense(o: Depense) {
    const items = this.elementForm.get('depenses') as FormArray;
    // o.prix = o.pivot.prix;
    items.push(this.newFormGroupDepense(o));
  }

  addDepenses() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.dialog.open(DialogAddDepenseComponent, dialogConfig);
  }

  changeDepense(value: Depense) {
    const items = this.elementForm.get('depenses') as FormArray;
    console.warn(this.isExistDepense(value.id, items.value));
    if (!this.isExistDepense(value.id, items.value)) {
      items.push(this.newFormGroupDepense(value));
    }
    this.depense = null;
  }

  isExistDepense(id: number, depenses: Depense[]): boolean {
    const ops = depenses.find(value => value.id.toString() === id.toString());
    return !!ops;
  }

  removeDepense(index: number) {
    this.depense = null;
    const items = this.elementForm.get('depenses') as FormArray;
    items.removeAt(index);
  }

}
