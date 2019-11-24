import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {MatDialog, MatDialogConfig, MatDialogRef, MatSelect} from '@angular/material';
import {Actions, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {filter, map} from 'rxjs/operators';
import {ConfirmComponent} from '../../../../layouts/alerts/confirm/confirm.component';
import {VoyageState} from '../../store/voyage.reducer';
import {selectVoyageIsLoadingSpinner} from '../../store/voyage.selectors';
import {LoadOneVoyageSuccess, VoyageActionTypes, UpdateVoyageRequest} from '../../store/voyage.actions';
import {selectAllCategories} from '../../../categorie/store/categorie.selectors';
import {Categorie} from '../../../categorie/model/categorie';
import {selectAllVilles, selectedChipsVilles} from '../../../ville/store/ville.selectors';
import {DialogAddCategorieComponent} from '../../../categorie/views/dialog-add-categorie/dialog-add-categorie.component';
import {SousCategorie} from '../../../sous-categorie/model/sous-categorie';
import {DialogAddVilleComponent} from '../../../ville/views/dialog-add-ville/dialog-add-ville.component';
import {Voyage} from '../../model/voyage';
import {ActivatedRoute, Router} from '@angular/router';
import {AddAllChipsSousCategories} from '../../../sous-categorie/store/sous-categorie.actions';
import {AddAllChipsVilles} from '../../../ville/store/ville.actions';
import {selectUserPermissions} from '../../../user/store/user.selectors';
import {UserPermissions} from '../../../user/model/user-permissions';
import {Ville} from '../../../ville/model/ville';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {BreakpointObserver} from '@angular/cdk/layout';

@Component({
  selector: 'app-update-voyage',
  templateUrl: './update-voyage.component.html',
  styleUrls: ['./update-voyage.component.scss']
})
export class UpdateVoyageComponent implements OnInit, OnDestroy {

  elementForm: FormGroup;
  isLoadingSpinnerSubscription: Subscription;
  loadOneVoyageSuccessSubscription: Subscription;
  updateVoyageSuccessSubscription: Subscription;
  isLoadingSpinner: boolean;
  categories: Observable<Categorie[]>;
  villes: number[];
  sousCategories: SousCategorie[];
  voyage: Voyage;
  userPermission: Observable<UserPermissions>;
  villes$: Observable<Ville[]>;
  villesVisiter: Ville[] = [];
  isSmall$: Observable<boolean> = this.breakpointObserver.observe('(max-width: 800px)')
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver,
              // @Inject(MAT_DIALOG_DATA) public data: { id: number },
              private  updates$: Actions, private fb: FormBuilder,
              private route: ActivatedRoute,
              private voyageState: Store<VoyageState>,
              private dialog: MatDialog) {
  }

  dropVille(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.villesVisiter, event.previousIndex, event.currentIndex);
  }

  ngOnInit() {
    this.userPermission = this.voyageState.select(selectUserPermissions);

    this.route.data.subscribe(value => {
      this.voyage = value.voyage as Voyage;
      this.sousCategories = this.voyage.categorie.sousCategories as any;
      this.voyageState.dispatch(new AddAllChipsVilles({villes: this.voyage.villes}));
      // console.warn(value.voyage);
      this.init();
    });
    this.villes$ = this.voyageState.select(selectAllVilles);
    this.voyageState.select(selectedChipsVilles).subscribe(value => {
      this.villes = value.map(value1 => value1.id);
    });
    this.categories = this.voyageState.select(selectAllCategories);


    this.updateVoyageSuccessSubscription = this.updates$.pipe(ofType(
      VoyageActionTypes.UpdateVoyageSuccess), map((action: LoadOneVoyageSuccess) => {

      })
    ).subscribe();
    this.isLoadingSpinnerSubscription = this.voyageState.select(selectVoyageIsLoadingSpinner).subscribe(value => {
      this.isLoadingSpinner = value;
    });
  }

  ngOnDestroy(): void {
    this.isLoadingSpinnerSubscription.unsubscribe();
    this.updateVoyageSuccessSubscription.unsubscribe();
  }

  save() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '440px';
    dialogConfig.data = {titre: 'Modification', body: 'Voulez-vous enregistrer la modification ?'};
    this.dialog.open(ConfirmComponent, dialogConfig).afterClosed().subscribe(value => {
      if (value) {
        this.voyageState.dispatch(new UpdateVoyageRequest({
          voyage: {
            ...this.elementForm.value,
            villes: this.villes,
            villesVisiter: this.villesVisiter.map(value1 => value1.id)
          }
        }));
      }
    });
  }

  onChangeCat(data: MatSelect) {
    // console.log(data.value);
    this.categories.subscribe(value => {
      const cat = value.find(value1 => value1.id.toString() === data.value.toString());
      this.sousCategories = cat.sousCategories as any;
    });
  }

  addVille() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.dialog.open(DialogAddVilleComponent, dialogConfig);
  }

  addCategorie() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.dialog.open(DialogAddCategorieComponent, dialogConfig);
  }

  private init() {
    this.elementForm = new FormGroup({
      id: this.fb.control(this.voyage.id, [Validators.required]),
      nom: this.fb.control(this.voyage.nom, [Validators.required]),
      lien: this.fb.control(this.voyage.lien, []),
      prixAdulte: this.fb.control(this.voyage.prixAdulte, [Validators.required]),
      prixEnfant: this.fb.control(this.voyage.prixEnfant, [Validators.required]),
      prixBebe: this.fb.control(this.voyage.prixBebe, [Validators.required]),
      minPlace: this.fb.control(this.voyage.minPlace, [Validators.required]),
      maxPlace: this.fb.control(this.voyage.maxPlace, [Validators.required]),
      description: this.fb.control(this.voyage.description, [Validators.required]),
      categorie_id: this.fb.control(this.voyage.categorie.id, [Validators.required]),
      villes: this.fb.control(this.voyage.villes.map(value => value.id), []),
      sous_categorie_id: this.fb.control(this.voyage.sousCategorie.id, [Validators.required]),
    });
    this.villesVisiter = this.voyage.villesVisiter;
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
}
