import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {VoyageurState} from '../../store/voyageur.reducer';
import {VoyageurActionTypes, SaveVoyageurRequest, LoadVoyageursRequest} from '../../store/voyageur.actions';
import {MatAutocompleteSelectedEvent, MatDialog, MatDialogConfig, MatDialogRef, MatSnackBar} from '@angular/material';
import {ConfirmComponent} from '../../../../layouts/alerts/confirm/confirm.component';
import {Observable, Subscription} from 'rxjs';
import {selectFeatureVoyageurs, selectVoyageurIsLoadingSpinner} from '../../store/voyageur.selectors';
import {Actions, ofType} from '@ngrx/effects';
import {map, takeUntil} from 'rxjs/operators';
import {selectIsLoading} from '../../../../root-state/root.selector';
import {selectAllGroupeConventions} from '../../../groupe-convention/store/groupe-convention.selectors';
import {GroupeConvention} from '../../../groupe-convention/model/groupe-convention';
import {$e} from 'codelyzer/angular/styles/chars';
import {
  LoadGroupeConventionsIsNotLoadedRequest,
  LoadGroupeConventionsRequest
} from '../../../groupe-convention/store/groupe-convention.actions';
import {PaginatorInformations} from '../../../../shared_models/paginator-informations';
import {ActivatedRoute} from '@angular/router';
import {DialogAddOptionComponent} from '../../../options/views/dialog-add-option/dialog-add-option.component';
import {DialogAddGroupeConventionComponent} from '../../../groupe-convention/views/dialog-add-groupe-convention/dialog-add-groupe-convention.component';

@Component({
  selector: 'app-model-add-voyageur',
  templateUrl: './dialog-add-voyageur.component.html',
  styleUrls: ['./dialog-add-voyageur.component.scss']
})
export class DialogAddVoyageurComponent implements OnInit, OnDestroy {
  elementForm = new FormGroup({
    nom: new FormControl('', [Validators.required]),
    prenom: new FormControl('', []),
    cin: new FormControl('', [Validators.required]),
    tel: new FormControl('', [Validators.required]),
    email: new FormControl('', []),
    sexe: new FormControl('homme', [Validators.required]),
    stadeVie: new FormControl('adulte', [Validators.required]),
    numPasseport: new FormControl('', []),
    dateExpiration: new FormControl('', []),
    black: new FormControl(false, []),
    groupe_convention_id: new FormControl('', []),
    groupe_convention: new FormControl('', []),
  });
  isLoadingSpinner: boolean;
  isLoadingSpinnerSubscription: Subscription;
  updatesSubscription: Subscription;
  isLoading: Observable<boolean>;
  groupesConvention: Observable<GroupeConvention[]>;


  constructor(public dialogRef: MatDialogRef<DialogAddVoyageurComponent>,
              private voyageurState: Store<VoyageurState>,
              private snackBar: MatSnackBar,
              private  updates$: Actions,
              private dialog: MatDialog,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.isLoadingSpinnerSubscription = this.voyageurState.select(selectVoyageurIsLoadingSpinner).subscribe(value => {
      this.isLoadingSpinner = value;
    });
    this.voyageurState.dispatch(new LoadGroupeConventionsIsNotLoadedRequest());
    this.groupesConvention = this.voyageurState.select(selectAllGroupeConventions);

    this.isLoading = this.voyageurState.select(selectIsLoading);
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
      const data = this.elementForm.value;
      delete data.groupe_convention;
      if (value) {
        this.voyageurState.dispatch(new SaveVoyageurRequest({voyageur: data}));
      }
    });
  }

  reset() {
    this.elementForm.setValue({nom: ''});
  }

  onSelectGroupeConvention($event: MatAutocompleteSelectedEvent) {
    this.elementForm.patchValue({
      groupe_convention: $event.option.value.nom,
      groupe_convention_id: $event.option.value.id,
    });
  }

  onSearchSelectGroupeConvention($event) {
    this.voyageurState.dispatch(new LoadGroupeConventionsRequest(
      '',
      $event, {current_page: 0, per_page: 10}));
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
