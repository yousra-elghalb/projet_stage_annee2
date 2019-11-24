import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {
  MatAutocompleteSelectedEvent,
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  MatSelect,
  MatSnackBar,
  MatTableDataSource
} from '@angular/material';
import {Store} from '@ngrx/store';
import {Actions, ofType} from '@ngrx/effects';
import {map} from 'rxjs/operators';
import {VoyageurService} from '../../../../voyageur/service/voyageur.service';
import {Categorie} from '../../../../categorie/model/categorie';
import {Agence} from '../../../../agence/model/Agence';
import {Modalite} from '../../../../modalite/model/modalite';
import {OffreVoyage} from '../../../../offre-voyage/model/offre-voyage';
import {UserPermissions} from '../../../../user/model/user-permissions';
import {VoyageurState} from '../../../../voyageur/store/voyageur.reducer';
import {SGroupe} from '../../model/s-groupe';
import {Option} from '../../../../options/model/option';
import {ActivatedRoute} from '@angular/router';
import {OffreVoyageService} from '../../../../offre-voyage/service/offre-voyage.service';
import {Voyageur} from '../../../../voyageur/model/voyageur';
import {Traite} from '../../../../offre-voyage/model/traite';
import {selectedChipsVilles} from '../../../../ville/store/ville.selectors';
import {selectAllOptions} from '../../../../options/store/option.selectors';
import {selectAllCategories} from '../../../../categorie/store/categorie.selectors';
import {selectUserPermissions} from '../../../../user/store/user.selectors';
import {selectOffreVoyageIsLoadingSpinner} from '../../../../offre-voyage/store/offre-voyage.selectors';
import {selectAllAgences} from '../../../../agence/store/agence.selectors';
import {selectAllModalites} from '../../../../modalite/store/modalite.selectors';
import {ConfirmComponent} from '../../../../../layouts/alerts/confirm/confirm.component';
import {SGroupeActionTypes, UpdateSGroupeRequest, UpdateSGroupeSuccess} from '../../store/s-groupe.actions';
import {DialogAddModalteComponent} from '../../../../modalite/views/dialog-add-modalte/dialog-add-modalte.component';
import {DialogAddOptionComponent} from '../../../../options/views/dialog-add-option/dialog-add-option.component';
import {LoadOneVoyageurRequest, UpdateVoyageurSuccess, VoyageurActionTypes} from '../../../../voyageur/store/voyageur.actions';
import {DialogUpdateVoyageurComponent} from '../../../../voyageur/views/dialog-update-voyageur/dialog-update-voyageur.component';
import {GroupeService} from '../../../service/groupe.service';
import {selectisLoadingSpinnerSGroupes} from '../../store/s-groupe.selectors';
// tslint:disable-next-line:max-line-length
import {DialogAddGroupeConventionComponent} from '../../../../groupe-convention/views/dialog-add-groupe-convention/dialog-add-groupe-convention.component';
import {
  LoadGroupeConventionsIsNotLoadedRequest,
  LoadGroupeConventionsRequest
} from '../../../../groupe-convention/store/groupe-convention.actions';
import {selectAllGroupeConventions} from '../../../../groupe-convention/store/groupe-convention.selectors';
import {GroupeConvention} from '../../../../groupe-convention/model/groupe-convention';
import {PGroupeActionTypes} from '../../../pgroupe/store/p-groupe.actions';
import {PGroupe} from '../../../pgroupe/model/p-groupe';


@Component({
  selector: 'app-update-groupe-of-offre-voyage',
  templateUrl: './update-groupe-of-offre-voyage.component.html',
  styleUrls: ['./update-groupe-of-offre-voyage.component.scss'],
  providers: [VoyageurService]
})
export class UpdateSGroupeOfOffreVoyageComponent implements OnInit, OnDestroy {
  elementForm: FormGroup;
  isLoadingSpinner: boolean;
  isLoadingSpinnerSubscription: Subscription;
  updatesSubscription: Subscription;
  categories: Observable<Categorie[]>;
  agences: Observable<Agence[]>;
  sousCategories: Categorie[];
  villes: number[];
  modalites: Observable<Modalite[]>;
  imageBase64: string;
  offreVoyage: OffreVoyage;
  elementFormChangeSub: Subscription;
  options$: Observable<Option[]>;
  option: any;
  optionMap: Map<number, { prix: number }> = new Map<number, { prix: number }>();
  reduction = 0;
  catId: string;
  groupe: SGroupe;
  userPermission: Observable<UserPermissions>;
  groupesConvention: Observable<GroupeConvention[]>;

  constructor(
    private voyageState: Store<VoyageurState>,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private offreVoyageService: OffreVoyageService,
    private voyageurService: VoyageurService,
    private  updates$: Actions,
    private  groupeService: GroupeService,
    private dialog: MatDialog, private fb: FormBuilder) {
  }

  newFormGroupVoyageurs(v: Voyageur): FormGroup {
    return this.fb.group({
      id: new FormControl(v.id, []),
      nom: new FormControl(v.nom, [Validators.required]),
      ville_depart: new FormControl(v.pivot.ville_depart, [Validators.required]),
      prenom: new FormControl(v.prenom, []),
      cin: new FormControl(v.cin, [Validators.required]),
      tel: new FormControl(v.tel, []),
      nb_voyage: new FormControl(v.nb_voyage, []),
      email: new FormControl(v.email, []),
      sexe: new FormControl(v.sexe, [Validators.required]),
      stadeVie: new FormControl(v.stadeVie, [Validators.required]),
      numPasseport: new FormControl(v.numPasseport, []),
      dateExpiration: new FormControl(v.dateExpiration, []),
    });
  }

  newFormGroupTraites(traite: Traite): FormGroup {
    return this.fb.group({
      id: new FormControl(traite.id, []),
      montant: new FormControl(traite.montant, [Validators.required, Validators.min(0), Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]),
      pieceJointe: new FormControl(traite.pieceJointe, []),
      date: new FormControl(traite.date, []),
      pieceJointeBase64: new FormControl('', []),
      modaliteDePaiement_id: new FormControl(traite.modaliteDePaiement_id, [Validators.required]),
    });
  }

  newFormGroupOption(o: Option): FormGroup {
    return this.fb.group({
      id: new FormControl(o.id, [Validators.required]),
      nom: new FormControl(o.nom, [Validators.required]),
      prix: new FormControl(o.prix, [Validators.required, Validators.min(0), Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]),
    });
  }

  init(g: SGroupe): void {
    this.elementForm = this.fb.group({
      id: this.fb.control(g.id, [Validators.required]),
      paiement_id: this.fb.control(g.paiement.id, [Validators.required]),
      etat: this.fb.control(g.etat, [Validators.required]),
      offre_voyage_id: this.fb.control(g.offre_voyage_id, [Validators.required]),
      reduction: this.fb.control(g.reduction, [Validators.required, Validators.min(0), Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]),
      reste: this.fb.control(g.paiement.reste, [Validators.required, Validators.min(0), Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]),
      totale: this.fb.control(g.paiement.totale, [Validators.required, Validators.min(0), Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]),
      groupe_convention_id: this.fb.control(g.groupe_convention_id, [Validators.required]),
      groupe_convention: this.fb.control(g.groupeConvention.nom, []),
      deleted_voyageurs_ids: this.fb.control(g.voyageurs.map(value => value.id), []),
      deleted_traites_ids: this.fb.control([], []),
      voyageurs: this.fb.array([]),
      traites: this.fb.array([]),
      options: this.fb.array([]),
    });
    this.elementForm.get('options').valueChanges.subscribe(value => {
      this.offreVoyageService.calculeTotale(this.elementForm, this.offreVoyage);
    });
    this.elementForm.get('traites').valueChanges.subscribe(value => {
      this.offreVoyageService.calculeTotale(this.elementForm, this.offreVoyage);
    });
    this.elementForm.get('reduction').valueChanges.subscribe(value => {
      this.offreVoyageService.calculeTotale(this.elementForm, this.offreVoyage);
    });
    this.elementForm.get('voyageurs').valueChanges.subscribe(value => {
      this.offreVoyageService.calculeTotale(this.elementForm, this.offreVoyage);
    });

    g.paiement.traites.forEach(value => {
      this.addTraite(value);
    });
    g.voyageurs.forEach(value => {
      this.addVoyageur(value);
    });
    g.options.forEach(value => {
      this.addOption(value);
    });
  }

  ngOnInit() {
    this.userPermission = this.voyageState.select(selectUserPermissions);
    this.route.paramMap.subscribe(value => {
      this.catId = value.get('catId');
    });
    this.route.data.subscribe(value => {
      this.offreVoyage = value.offreVoyage;
      this.groupe = value.groupe as SGroupe;
      this.init(this.groupe);
    });
    this.updatesSubscription = this.updates$.pipe(ofType(
      SGroupeActionTypes.UpdateSGroupeSuccess), map((value: UpdateSGroupeSuccess) => {
        this.init(value.payload.sGroupe);
      })
    ).subscribe();
    this.voyageState.dispatch(new LoadGroupeConventionsIsNotLoadedRequest());
    this.groupesConvention = this.voyageState.select(selectAllGroupeConventions);

    this.categories = this.voyageState.select(selectAllCategories);
    this.options$ = this.voyageState.select(selectAllOptions);
    this.modalites = this.voyageState.select(selectAllModalites);
    this.agences = this.voyageState.select(selectAllAgences);
    this.isLoadingSpinnerSubscription = this.voyageState.select(selectisLoadingSpinnerSGroupes).subscribe(value => {
      this.isLoadingSpinner = value;
    });
    this.voyageState.select(selectedChipsVilles).subscribe(value => {
      this.villes = value.map(value1 => value1.id);
    });
  }

  ngOnDestroy(): void {
    this.isLoadingSpinnerSubscription.unsubscribe();
  }

  save() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '440px';
    dialogConfig.data = {titre: 'Ajout', body: 'Voulez-vous Entregistrer ?'};
    this.dialog.open(ConfirmComponent, dialogConfig).afterClosed().subscribe(value => {
      if (value) {
        const data = {
          ...this.elementForm.value
        };
        this.voyageState.dispatch(new UpdateSGroupeRequest({sGroupe: data}));
      }
    });
  }

  addVoyageur(v: Voyageur) {
    const items = this.elementForm.get('voyageurs') as FormArray;
    const fromVoyageur = this.newFormGroupVoyageurs(v);
    fromVoyageur.get('nom').disable({onlySelf: true});
    fromVoyageur.get('prenom').disable({onlySelf: true});
    fromVoyageur.get('tel').disable({onlySelf: true});
    fromVoyageur.get('email').disable({onlySelf: true});
    fromVoyageur.get('sexe').disable({onlySelf: true});
    fromVoyageur.get('stadeVie').disable({onlySelf: true});
    fromVoyageur.get('dateExpiration').disable({onlySelf: true});
    fromVoyageur.get('numPasseport').disable({onlySelf: true});
    items.push(fromVoyageur);
  }

  addNewVoyageur() {
    const items = this.elementForm.get('voyageurs') as FormArray;
    items.push(this.newFormGroupVoyageurs({}));
  }

  removeVoyageur(index) {
    const items = this.elementForm.get('voyageurs') as FormArray;
    if (items.length > 1) {
      items.removeAt(index);
    }
  }


  openIframe(index) {
    const items = this.elementForm.get('traites') as FormArray;
    const traite = items.at(index).value;
    if (!traite.pieceJointeChanged) {
      this.groupeService.openIframe(this.dialog, traite.pieceJointe);
    } else {
      this.groupeService.openIframe(this.dialog, traite.base64);
    }
  }

  addTraite(t: Traite) {
    const items = this.elementForm.get('traites') as FormArray;
    items.push(this.newFormGroupTraites(t));
  }

  addNewTraite() {
    const items = this.elementForm.get('traites') as FormArray;
    items.push(this.newFormGroupTraites({}));
  }

  addOption(o: Option) {
    const items = this.elementForm.get('options') as FormArray;
    o.prix = o.pivot.prix;
    items.push(this.newFormGroupOption(o));
  }

  removeTraite(index: number) {
    const items = this.elementForm.get('traites') as FormArray;
    if (items.length > 1) {
      const v = items.at(index).value as Traite;
      if (v.id) {
        const vIds = this.elementForm.value.deleted_traites_ids as number[];
        this.elementForm.patchValue({deleted_traites_ids: [...vIds, v.id]});
      }
      items.removeAt(index);
    }
  }

  addModalite() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.dialog.open(DialogAddModalteComponent, dialogConfig);
  }

  OnChangeImage(index) {
    const items = this.elementForm.get('traites') as FormArray;

    this.handleFileSelect(items.at(index).value.pieceJointe._files[0], index);
  }

  handleFileSelect(f, i): any {
    const reader = new FileReader();
    reader.readAsDataURL(f);
    reader.onload = (e) => {
      if (typeof reader.result === 'string') {
        const items = this.elementForm.get('traites') as FormArray;
        items.at(i).patchValue({pieceJointeBase64: reader.result});

      }
    };
  }

  chercheVoyageur(i: number) {
    const items = this.elementForm.get('voyageurs') as FormArray;
    this.voyageurService.findByCin(items.at(i).value.cin).subscribe(value => {
      this.offreVoyageService.changeValueVoyageur(items.at(i), value);
    }, error1 => {
      this.offreVoyageService.initValueVoyageur(items.at(i));
    });
  }

  addOptions() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.dialog.open(DialogAddOptionComponent, dialogConfig);
  }

  changeOption(value: Option) {
    const items = this.elementForm.get('options') as FormArray;
    console.warn(this.isExistOption(value.id, items.value));
    if (!this.isExistOption(value.id, items.value)) {
      items.push(this.newFormGroupOption(value));
    }
    this.option = null;
  }

  isExistOption(id: number, options: Option[]): boolean {
    const ops = options.find(value => value.id.toString() === id.toString());
    return !!ops;
  }

  removeOption(index: number) {
    this.option = null;
    const items = this.elementForm.get('options') as FormArray;
    items.removeAt(index);
  }

  updateVoyageur(selectedId: number, index: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.voyageState.dispatch(new LoadOneVoyageurRequest({id: selectedId}));
    this.dialog.open(DialogUpdateVoyageurComponent, dialogConfig);
    this.updates$.pipe(ofType(
      VoyageurActionTypes.UpdateVoyageurSuccess), map((value: UpdateVoyageurSuccess) => {
        const items = this.elementForm.get('voyageurs') as FormArray;
        this.offreVoyageService.changeValueVoyageur(items.at(index), value.payload.voyageur);
      })
    ).subscribe();
  }

  onSelectGroupeConvention($event: MatAutocompleteSelectedEvent) {
    this.elementForm.patchValue({
      groupe_convention: $event.option.value.nom,
      groupe_convention_id: $event.option.value.id,
    });
  }

  onSearchSelectGroupeConvention($event) {
    this.voyageState.dispatch(new LoadGroupeConventionsRequest(
      '',
      $event,
      {current_page: 0, per_page: 10}));
  }

  onClearSelectedGroupeConvention() {
    this.elementForm.patchValue({
      groupe_convention: '',
      groupe_convention_id: '',
    });
  }

  addGroupeConvention() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.dialog.open(DialogAddGroupeConventionComponent, dialogConfig);
  }
}
