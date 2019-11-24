import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {MatDialog, MatDialogConfig, MatDialogRef, MatSelect, MatSnackBar} from '@angular/material';
import {Store} from '@ngrx/store';
import {Actions, ofType} from '@ngrx/effects';
import {map} from 'rxjs/operators';
import {ConfirmComponent} from '../../../../../layouts/alerts/confirm/confirm.component';
import {Categorie} from '../../../../categorie/model/categorie';
import {selectAllCategories} from '../../../../categorie/store/categorie.selectors';
import {Agence} from '../../../../agence/model/Agence';
import {selectAllAgences} from '../../../../agence/store/agence.selectors';
import {selectedChipsVilles} from '../../../../ville/store/ville.selectors';
import {VoyageurState} from '../../../../voyageur/store/voyageur.reducer';
import {selectVoyageurIsLoadingSpinner} from '../../../../voyageur/store/voyageur.selectors';
import {selectAllModalites} from '../../../../modalite/store/modalite.selectors';
import {Modalite} from '../../../../modalite/model/modalite';
import {DialogAddModalteComponent} from '../../../../modalite/views/dialog-add-modalte/dialog-add-modalte.component';
import {ActivatedRoute, Router} from '@angular/router';
import {OffreVoyage} from '../../../../offre-voyage/model/offre-voyage';
import {Voyageur} from '../../../../voyageur/model/voyageur';
import {Traite} from '../../../../offre-voyage/model/traite';
import {OffreVoyageActionTypes} from '../../../../offre-voyage/store/offre-voyage.actions';
import {VoyageurService} from '../../../../voyageur/service/voyageur.service';
import {selectAllOptions} from '../../../../options/store/option.selectors';
import {Option} from '../../../../options/model/option';
import {DialogAddOptionComponent} from '../../../../options/views/dialog-add-option/dialog-add-option.component';
import {Pivot} from '../../../../permission/model/pivot';
import {selectOffreVoyageIsLoadingSpinner} from '../../../../offre-voyage/store/offre-voyage.selectors';
import {OffreVoyageService} from '../../../../offre-voyage/service/offre-voyage.service';
import {selectUserPermissions} from '../../../../user/store/user.selectors';
import {UserPermissions} from '../../../../user/model/user-permissions';
import {LoadOneVoyageurRequest, UpdateVoyageurSuccess, VoyageurActionTypes} from '../../../../voyageur/store/voyageur.actions';
import {DialogUpdateVoyageurComponent} from '../../../../voyageur/views/dialog-update-voyageur/dialog-update-voyageur.component';
import {PGroupeActionTypes, SavePGroupeRequest} from '../../store/p-groupe.actions';
import {selectPGroupeIsLoadingSpinner} from '../../store/p-groupe.selectors';
import {GroupeService} from '../../../service/groupe.service';
import {BreakpointObserver} from '@angular/cdk/layout';


@Component({
  selector: 'app-add-voyageur',
  templateUrl: './add-voyageur-to-offre-voyage.component.html',
  styleUrls: ['./add-voyageur-to-offre-voyage.component.scss'],
  providers: [VoyageurService]
})
export class AddVoyageurToOffreVoyageComponent implements OnInit, OnDestroy {
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
      type: this.fb.control('amicale', [Validators.required]),
      ville_id: this.fb.control('', [Validators.required]),
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
      this.offreVoyageService.calculeTotale(
        this.elementForm,
        this.offreVoyage);
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


    this.categories = this.voyageState.select(selectAllCategories);
    this.options$ = this.voyageState.select(selectAllOptions);
    this.modalites = this.voyageState.select(selectAllModalites);
    this.agences = this.voyageState.select(selectAllAgences);
    this.isLoadingSpinnerSubscription = this.voyageState.select(selectPGroupeIsLoadingSpinner).subscribe(value => {
      this.isLoadingSpinner = value;
    });
    this.updatesSubscription = this.updates$.pipe(ofType(
      PGroupeActionTypes.SavePGroupeSuccess), map(value => {
        this.init();
      })
    ).subscribe();
    this.voyageState.select(selectedChipsVilles).subscribe(value => {
      this.villes = value.map(value1 => value1.id);
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
            }
          ))
        };
        this.voyageState.dispatch(new SavePGroupeRequest({pGroupe: data}));
      }
    });
  }

  reset() {
    this.init();
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

  openIframe(index) {
    const items = this.elementForm.get('traites') as FormArray;
    const traite = items.at(index).value;
    this.groupeService.openIframe(this.dialog, traite.base64);
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

}
