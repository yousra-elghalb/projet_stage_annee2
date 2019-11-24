import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {MatAutocompleteSelectedEvent, MatDialog, MatDialogConfig, MatDialogRef, MatSelect, MatSnackBar} from '@angular/material';
import {Store} from '@ngrx/store';
import {Actions, ofType} from '@ngrx/effects';
import {map} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {VoyageurService} from '../../../../voyageur/service/voyageur.service';
import {Categorie} from '../../../../categorie/model/categorie';
import {Agence} from '../../../../agence/model/Agence';
import {OffreVoyageService} from '../../../../offre-voyage/service/offre-voyage.service';
import {VoyageurState} from '../../../../voyageur/store/voyageur.reducer';
import {UserPermissions} from '../../../../user/model/user-permissions';
import {Option} from '../../../../options/model/option';
import {selectOffreVoyageIsLoadingSpinner} from '../../../../offre-voyage/store/offre-voyage.selectors';
import {selectedChipsVilles} from '../../../../ville/store/ville.selectors';
import {selectAllAgences} from '../../../../agence/store/agence.selectors';
import {selectAllModalites} from '../../../../modalite/store/modalite.selectors';
import {selectAllOptions} from '../../../../options/store/option.selectors';
import {selectAllCategories} from '../../../../categorie/store/categorie.selectors';
import {ConfirmComponent} from '../../../../../layouts/alerts/confirm/confirm.component';
import {DialogAddModalteComponent} from '../../../../modalite/views/dialog-add-modalte/dialog-add-modalte.component';
import {DialogAddOptionComponent} from '../../../../options/views/dialog-add-option/dialog-add-option.component';
import {LoadOneVoyageurRequest, UpdateVoyageurSuccess, VoyageurActionTypes} from '../../../../voyageur/store/voyageur.actions';
import {DialogUpdateVoyageurComponent} from '../../../../voyageur/views/dialog-update-voyageur/dialog-update-voyageur.component';
import {selectUserPermissions} from '../../../../user/store/user.selectors';
import {Modalite} from '../../../../modalite/model/modalite';
import {OffreVoyage} from '../../../../offre-voyage/model/offre-voyage';
import {SaveSGroupeRequest, SGroupeActionTypes} from '../../store/s-groupe.actions';
import {Traite} from '../../../../offre-voyage/model/traite';
import {GroupeService} from '../../../service/groupe.service';
import {selectisLoadingSpinnerSGroupes} from '../../store/s-groupe.selectors';
import {BreakpointObserver} from '@angular/cdk/layout';
import {
  LoadGroupeConventionsIsNotLoadedRequest,
  LoadGroupeConventionsRequest
} from '../../../../groupe-convention/store/groupe-convention.actions';
import {selectAllGroupeConventions} from '../../../../groupe-convention/store/groupe-convention.selectors';
import {GroupeConvention} from '../../../../groupe-convention/model/groupe-convention';
// tslint:disable-next-line:max-line-length
import {DialogAddGroupeConventionComponent} from '../../../../groupe-convention/views/dialog-add-groupe-convention/dialog-add-groupe-convention.component';

@Component({
  selector: 'app-add-groupe-to-offre-voyage',
  templateUrl: './add-groupe-to-offre-voyage.component.html',
  styleUrls: ['./add-groupe-to-offre-voyage.component.scss'],
  providers: [VoyageurService]
})
export class AddGroupeToOffreVoyageComponent implements OnInit, OnDestroy {
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
  userPermission: Observable<UserPermissions>;
  isSmall$: Observable<boolean> = this.breakpointObserver.observe('(max-width: 800px)')
    .pipe(
      map(result => result.matches)
    );
  groupesConvention: Observable<GroupeConvention[]>;

  constructor(private breakpointObserver: BreakpointObserver,
              private voyageState: Store<VoyageurState>,
              private snackBar: MatSnackBar,
              private route: ActivatedRoute,
              private voyageurService: VoyageurService,
              private offreVoyageService: OffreVoyageService,
              private  updates$: Actions,
              private  groupeService: GroupeService,
              private dialog: MatDialog, private fb: FormBuilder) {
  }

  newFormGroupVoyageurs(): FormGroup {
    return this.fb.group({
      id: new FormControl('', []),
      nom: new FormControl('', [Validators.required]),
      prenom: new FormControl('', []),
      ville_depart: new FormControl('', [Validators.required]),
      cin: new FormControl('', [Validators.required]),
      tel: new FormControl('', []),
      nb_voyage: new FormControl('', []),
      email: new FormControl('', []),
      sexe: new FormControl('homme', [Validators.required]),
      stadeVie: new FormControl('adulte', [Validators.required]),
      numPasseport: new FormControl('', []),
      dateExpiration: new FormControl('', []),
    });
  }

  newFormGroupTraites(): FormGroup {
    return this.fb.group({
      id: new FormControl('', []),
      montant: new FormControl('', [Validators.required, Validators.min(0), Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]),
      pieceJointe: new FormControl('', []),
      date: new FormControl(new Date(), []),
      base64: new FormControl('', []),
      modaliteDePaiement_id: new FormControl('', [Validators.required]),
    });
  }

  newFormGroupOption(o: Option): FormGroup {
    return this.fb.group({
      id: new FormControl(o.id, [Validators.required]),
      nom: new FormControl(o.nom, [Validators.required]),
      prix: new FormControl(0, [Validators.required, Validators.min(0), Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]),
    });
  }

  init(): void {
    this.elementForm = this.fb.group({
      etat: this.fb.control('en attente', [Validators.required]),
      offre_voyage_id: this.fb.control(this.offreVoyage.id, [Validators.required]),
      reduction: this.fb.control(0, [Validators.required, Validators.min(0), Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]),
      reste: this.fb.control(0, [Validators.required, Validators.min(0), Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]),
      totale: this.fb.control(0, [Validators.required, Validators.min(0), Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]),
      groupe_convention_id: this.fb.control('', [Validators.required]),
      groupe_convention: this.fb.control('', []),
      voyageurs: this.fb.array([this.newFormGroupVoyageurs()]),
      traites: this.fb.array([this.newFormGroupTraites()]),
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

  }

  ngOnInit() {
    this.userPermission = this.voyageState.select(selectUserPermissions);
    this.route.paramMap.subscribe(value => {
      this.catId = value.get('catId');
    });
    this.route.data.subscribe(value => {
      this.offreVoyage = value.offreVoyage;
      this.init();
    });

    this.voyageState.dispatch(new LoadGroupeConventionsIsNotLoadedRequest());
    this.groupesConvention = this.voyageState.select(selectAllGroupeConventions);

    this.categories = this.voyageState.select(selectAllCategories);
    this.options$ = this.voyageState.select(selectAllOptions);
    this.modalites = this.voyageState.select(selectAllModalites);
    this.agences = this.voyageState.select(selectAllAgences);
    this.isLoadingSpinnerSubscription = this.voyageState.select(selectisLoadingSpinnerSGroupes).subscribe(value => {
      this.isLoadingSpinner = value;
    });
    this.updatesSubscription = this.updates$.pipe(ofType(
      SGroupeActionTypes.SaveSGroupeSuccess), map(value => {
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
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '440px';
    dialogConfig.data = {titre: 'Ajout', body: 'Voulez-vous Entregistrer ?'};
    this.dialog.open(ConfirmComponent, dialogConfig).afterClosed().subscribe(value => {
      if (value) {
        const vtraites = this.elementForm.value.traites as Traite[];
        const data = {
          ...this.elementForm.value,
          traites: vtraites.map(value1 => (
            {
              ...value1,
              pieceJointe: value1.base64,
              base64: null
            }))
        };
        this.voyageState.dispatch(new SaveSGroupeRequest({sGroupe: data}));
      }
    });
  }

  reset() {
    this.init();
  }

  openIframe(index) {
    const items = this.elementForm.get('traites') as FormArray;
    const traite = items.at(index).value;
    this.groupeService.openIframe(this.dialog, traite.base64);
  }

  addVoyageur() {
    const items = this.elementForm.get('voyageurs') as FormArray;
    items.push(this.newFormGroupVoyageurs());
  }

  removeVoyageur(index) {
    const items = this.elementForm.get('voyageurs') as FormArray;
    if (items.length > 1) {
      items.removeAt(index);
    }
  }


  addTraite() {
    const items = this.elementForm.get('traites') as FormArray;
    items.push(this.newFormGroupTraites());
  }

  removeTraite(index: number) {
    const items = this.elementForm.get('traites') as FormArray;
    if (items.length > 1) {
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
        // items.at(i).patchValue({base64: 'hahasalam'});
        items.at(i).patchValue({base64: reader.result.toString()});
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
