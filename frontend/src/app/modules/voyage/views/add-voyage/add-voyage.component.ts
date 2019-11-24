import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {MatDialog, MatDialogConfig, MatDialogRef, MatSelect, MatSnackBar} from '@angular/material';
import {Store} from '@ngrx/store';
import {VoyageState} from '../../store/voyage.reducer';
import {Actions, ofType} from '@ngrx/effects';
import {selectVoyageIsLoadingSpinner} from '../../store/voyage.selectors';
import {VoyageActionTypes, SaveVoyageRequest} from '../../store/voyage.actions';
import {map} from 'rxjs/operators';
import {ConfirmComponent} from '../../../../layouts/alerts/confirm/confirm.component';
import {Categorie} from '../../../categorie/model/categorie';
import {selectAllCategories} from '../../../categorie/store/categorie.selectors';
import {DialogAddCategorieComponent} from '../../../categorie/views/dialog-add-categorie/dialog-add-categorie.component';
import {Agence} from '../../../agence/model/Agence';
import {selectAllAgences} from '../../../agence/store/agence.selectors';
import {DialogAddSousCategorieComponent} from '../../../sous-categorie/views/dialog-add-sous-categorie/dialog-add-sous-categorie.component';
import {DialogAddVilleComponent} from '../../../ville/views/dialog-add-ville/dialog-add-ville.component';
import {selectedChipsSousCategories} from '../../../sous-categorie/store/sous-categorie.selectors';
import {selectAllVilles, selectedChipsVilles} from '../../../ville/store/ville.selectors';
import {selectAllAccompagnateurs} from '../../../accompagnateur/store/accompagnateur.selectors';
import {Accompagnateur} from '../../../accompagnateur/model/accompagnateur';
import {DialogAddAgenceComponent} from '../../../agence/views/dialog-add-agence/dialog-add-agence.component';
// tslint:disable-next-line:max-line-length
import {DialogAddAccompagnateurComponent} from '../../../accompagnateur/views/dialog-add-accompagnateur/dialog-add-accompagnateur.component';
import {selectUserPermissions} from '../../../user/store/user.selectors';
import {UserPermissions} from '../../../user/model/user-permissions';
import {Ville} from '../../../ville/model/ville';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {DialogAddVehiculeComponent} from '../../../vehicule/views/dialog-add-vehicule/dialog-add-vehicule.component';
import {DialogAddChauffeurComponent} from '../../../chauffeur/views/dialog-add-chauffeur/dialog-add-chauffeur.component';
import {LoadVehiculesIsNotLoadedRequest} from '../../../vehicule/store/vehicule.actions';
import {selectAllVehicules} from '../../../vehicule/store/vehicule.selectors';
import {LoadChauffeursIsNotLoadedRequest} from '../../../chauffeur/store/chauffeur.actions';
import {selectAllChauffeurs} from '../../../chauffeur/store/chauffeur.selectors';
import {Vehicule} from '../../../vehicule/model/vehicule';
import {Chauffeur} from '../../../chauffeur/model/chauffeur';
import {BreakpointObserver} from '@angular/cdk/layout';


@Component({
  selector: 'app-add-voyage',
  templateUrl: './add-voyage.component.html',
  styleUrls: ['./add-voyage.component.scss']
})
export class AddVoyageComponent implements OnInit, OnDestroy {
  elementForm: FormGroup;
  isLoadingSpinner: boolean;
  isLoadingSpinnerSubscription: Subscription;
  updatesSubscription: Subscription;
  categories: Observable<Categorie[]>;
  agences: Observable<Agence[]>;
  sousCategories: Categorie[];
  villes: number[];
  villes$: Observable<Ville[]>;
  villesVisiter: Ville[] = [];
  accompagnateurs: Observable<Accompagnateur[]>;
  userPermission: Observable<UserPermissions>;
  vehicules: Observable<Vehicule[]>;
  chauffeurs: Observable<Chauffeur[]>;
  isSmall$: Observable<boolean> = this.breakpointObserver.observe('(max-width: 800px)')
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver,
              private voyageState: Store<VoyageState>,
              private snackBar: MatSnackBar,
              private  updates$: Actions,
              private dialog: MatDialog, private fb: FormBuilder) {
    this.init();
  }

  dropVille(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.villesVisiter, event.previousIndex, event.currentIndex);
  }

  init(): any {
    this.elementForm = this.fb.group({
      nom: this.fb.control('', [Validators.required]),
      lien: this.fb.control('', []),
      prixAdulte: this.fb.control('', [Validators.required]),
      prixEnfant: this.fb.control('', [Validators.required]),
      prixBebe: this.fb.control('', [Validators.required]),
      minPlace: this.fb.control('', [Validators.required]),
      maxPlace: this.fb.control('', [Validators.required]),
      description: this.fb.control('Voyage et prestations de service', [Validators.required]),
      categorie_id: this.fb.control('', [Validators.required]),
      villes: this.fb.control('', []),
      sous_categorie_id: this.fb.control('', [Validators.required]),
      offreVoyages: this.fb.array([this.newFormGroupOffreVoyage()]),
    });
  }

  newFormGroupOffreVoyage(): FormGroup {
    return this.fb.group({
      dateDepart: this.fb.control('', [Validators.required]),
      dateDarrive: this.fb.control('', [Validators.required]),
      statut: this.fb.control('', [Validators.required]),
      suffixe: this.fb.control('', [Validators.required]),
      groupe: new FormControl(false, []),
      agence_id: this.fb.control('', []),
      vehicule_id: this.fb.control('', []),
      chauffeur_id: this.fb.control('', []),
      accompagnateur_ids: this.fb.control('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.userPermission = this.voyageState.select(selectUserPermissions);
    this.categories = this.voyageState.select(selectAllCategories);
    this.accompagnateurs = this.voyageState.select(selectAllAccompagnateurs);
    this.voyageState.dispatch(new LoadVehiculesIsNotLoadedRequest());
    this.vehicules = this.voyageState.select(selectAllVehicules);
    this.voyageState.dispatch(new LoadChauffeursIsNotLoadedRequest());
    this.chauffeurs = this.voyageState.select(selectAllChauffeurs);
    this.agences = this.voyageState.select(selectAllAgences);
    this.isLoadingSpinnerSubscription = this.voyageState.select(selectVoyageIsLoadingSpinner).subscribe(value => {
      this.isLoadingSpinner = value;
    });
    this.villes$ = this.voyageState.select(selectAllVilles);
    this.updatesSubscription = this.updates$.pipe(ofType(
      VoyageActionTypes.SaveVoyageSuccess), map(value => {
        this.init();
      })
    ).subscribe();
    this.voyageState.select(selectedChipsVilles).subscribe(value => {
      this.villes = value.map(value1 => value1.id);
      console.warn(this.villes);

    });
  }

  ngOnDestroy(): void {
    this.isLoadingSpinnerSubscription.unsubscribe();
    this.updatesSubscription.unsubscribe();
  }

  save() {
    console.log(this.elementForm.value);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '440px';
    dialogConfig.data = {titre: 'Ajout', body: 'Voulez-vous Entregistrer ?'};
    this.dialog.open(ConfirmComponent, dialogConfig).afterClosed().subscribe(value => {
      if (value) {
        const data = {
            ...this.elementForm.value,
            categorie_id: this.elementForm.value.categorie_id.id,
            villes: this.villes,
            villesVisiter: this.villesVisiter.map(value1 => value1.id)
          }
        ;
        this.voyageState.dispatch(new SaveVoyageRequest({voyage: data}));
      }
    });
  }

  reset() {
    this.init();
  }

  onChangeCat(data: MatSelect) {
    // console.log(data.value);
    this.sousCategories = (data.value) ? data.value.sousCategories : [];
  }

  addCategorie() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.dialog.open(DialogAddCategorieComponent, dialogConfig);
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

  test() {
    console.warn(this.elementForm.value.voyageur);
  }

  addVille() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.dialog.open(DialogAddVilleComponent, dialogConfig);
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

  onChangeVille(ville: MatSelect) {
    const v = this.villesVisiter.find(value => value.id.toString() === ville.value.id.toString());
    if (v === undefined) {
      this.villesVisiter.push(ville.value);
    }
  }

  removeVilleVisiter(ville: Ville) {
    this.villesVisiter = this.villesVisiter.filter(value => value.id !== ville.id);
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
