import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {MatDialog, MatDialogConfig, MatDialogRef, MatSelect, MatSnackBar, MatTableDataSource} from '@angular/material';
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
import {VoyageurService} from '../../../../voyageur/service/voyageur.service';
import {selectAllOptions} from '../../../../options/store/option.selectors';
import {Option} from '../../../../options/model/option';
import {DialogAddOptionComponent} from '../../../../options/views/dialog-add-option/dialog-add-option.component';
import {Pivot} from '../../../../permission/model/pivot';
import {Groupe} from '../../../../offre-voyage/model/groupe';
import {selectOffreVoyageIsLoadingSpinner} from '../../../../offre-voyage/store/offre-voyage.selectors';
import {OffreVoyageActionTypes} from '../../../../offre-voyage/store/offre-voyage.actions';
import {OffreVoyageService} from '../../../../offre-voyage/service/offre-voyage.service';
import {selectUserPermissions} from '../../../../user/store/user.selectors';
import {UserPermissions} from '../../../../user/model/user-permissions';
import {LoadOneVoyageurRequest, UpdateVoyageurSuccess, VoyageurActionTypes} from '../../../../voyageur/store/voyageur.actions';
import {DialogUpdateVoyageurComponent} from '../../../../voyageur/views/dialog-update-voyageur/dialog-update-voyageur.component';
import {PGroupeActionTypes, UpdatePGroupeRequest} from '../../store/p-groupe.actions';
import {selectPGroupeIsLoadingSpinner, selectSelectedPGroupe} from '../../store/p-groupe.selectors';
import {PGroupe} from '../../model/p-groupe';
import {DialogIframePeimentComponent} from '../../../../../layouts/dialog-iframe-peiment/dialog-iframe-peiment.component';
import {GroupeService} from '../../../service/groupe.service';
import {BreakpointObserver} from '@angular/cdk/layout';


@Component({
  selector: 'app-update-voyageurs-of-offre-voyage',
  templateUrl: './update-voyageurs-of-offre-voyage.component.html',
  styleUrls: ['./update-voyageurs-of-offre-voyage.component.scss'],
  providers: [VoyageurService]
})
export class UpdateVoyageursOfOffreVoyageComponent implements OnInit, OnDestroy {
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
  groupe: PGroupe;
  userPermission: Observable<UserPermissions>;
  isSmall$: Observable<boolean> = this.breakpointObserver.observe('(max-width: 800px)')
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver,
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
      pieceJointeChanged: new FormControl(false, []),
      date: new FormControl(traite.date, []),
      base64: new FormControl('', []),
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

  init(g: PGroupe): void {
    this.elementForm = this.fb.group({
      id: this.fb.control(g.id, [Validators.required]),
      paiement_id: this.fb.control(g.paiement.id, [Validators.required]),
      etat: this.fb.control(g.etat, [Validators.required]),
      offre_voyage_id: this.fb.control(g.offre_voyage_id, [Validators.required]),
      reduction: this.fb.control(g.reduction, [Validators.required, Validators.min(0), Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]),
      reste: this.fb.control(g.paiement.reste, [Validators.required, Validators.min(0), Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]),
      totale: this.fb.control(g.paiement.totale, [Validators.required, Validators.min(0), Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]),
      type: this.fb.control(g.type, [Validators.required]),
      ville_id: this.fb.control(g.ville_id, [Validators.required]),
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
      this.addOption({...value, prix: value.pivot.prix});
    });
  }

  ngOnInit() {
    this.userPermission = this.voyageState.select(selectUserPermissions);

    this.route.paramMap.subscribe(value => {
      this.catId = value.get('catId');
    });
    this.voyageState.select(selectSelectedPGroupe).subscribe(value => {
      this.groupe = value;
      this.route.data.subscribe(value2 => {
        this.offreVoyage = value2.offreVoyage;
        this.init(this.groupe);
      });
    });
    this.updatesSubscription = this.updates$.pipe(ofType(
      PGroupeActionTypes.UpdatePGroupeSuccess), map((value: { payload: { pGroupe: PGroupe } }) => {
        this.init(value.payload.pGroupe);
        // console.log('walopppp ', value);
      })
    ).subscribe();
    this.categories = this.voyageState.select(selectAllCategories);
    this.options$ = this.voyageState.select(selectAllOptions);
    this.modalites = this.voyageState.select(selectAllModalites);
    this.agences = this.voyageState.select(selectAllAgences);
    this.isLoadingSpinnerSubscription = this.voyageState.select(selectPGroupeIsLoadingSpinner).subscribe(value => {
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
        const vtraites = this.elementForm.value.traites;
        const data = {
          ...this.elementForm.value,
          traites: vtraites.map(value1 => {
            return (value1.pieceJointeChanged) ? {
              ...value1,
              pieceJointe: value1.base64,
              base64: null
            } : value1;
          })
        };
        this.voyageState.dispatch(new UpdatePGroupeRequest({pGroupe: data}));
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
        items.at(i).patchValue({
          base64: reader.result,
          pieceJointeChanged: true
        });

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

  openIframe(index) {
    const items = this.elementForm.get('traites') as FormArray;
    const traite = items.at(index).value;
    if (!traite.pieceJointeChanged) {
      this.groupeService.openIframe(this.dialog, traite.pieceJointe);
    } else {
      this.groupeService.openIframe(this.dialog, traite.base64);
    }
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

}
