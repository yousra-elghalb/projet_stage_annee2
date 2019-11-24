import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatAutocompleteSelectedEvent, MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {ConfirmComponent} from '../../../../layouts/alerts/confirm/confirm.component';
import {select, Store} from '@ngrx/store';
import {VoyageurState} from '../../store/voyageur.reducer';
import {
  LoadOneVoyageurSuccess,
  VoyageurActionTypes,
  SaveVoyageurRequest,
  UpdateVoyageurRequest,
  UpdateVoyageurSuccess, LoadVoyageursRequest
} from '../../store/voyageur.actions';
import {Voyageur} from '../../model/voyageur';
import {selectFeatureVoyageurs, selectVoyageurIsLoadingSpinner} from '../../store/voyageur.selectors';
import {Observable, Subscription} from 'rxjs';
import {Actions, ofType} from '@ngrx/effects';
import {map} from 'rxjs/operators';
import {Permission} from '../../../permission/model/permission';
import {
  LoadGroupeConventionsIsNotLoadedRequest,
  LoadGroupeConventionsRequest
} from '../../../groupe-convention/store/groupe-convention.actions';
import {selectAllGroupeConventions} from '../../../groupe-convention/store/groupe-convention.selectors';
import {GroupeConvention} from '../../../groupe-convention/model/groupe-convention';
import {PaginatorInformations} from '../../../../shared_models/paginator-informations';
import {ActivatedRoute} from '@angular/router';
import {DialogAddGroupeConventionComponent} from '../../../groupe-convention/views/dialog-add-groupe-convention/dialog-add-groupe-convention.component';

@Component({
  selector: 'app-dialog-update-voyageur',
  templateUrl: './dialog-update-voyageur.component.html',
  styleUrls: ['./dialog-update-voyageur.component.scss']
})
export class DialogUpdateVoyageurComponent implements OnInit, OnDestroy {
  elementForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    nom: new FormControl('', [Validators.required]),
    prenom: new FormControl('', []),
    cin: new FormControl('', [Validators.required]),
    tel: new FormControl('', [Validators.required]),
    email: new FormControl('', []),
    sexe: new FormControl('', [Validators.required]),
    stadeVie: new FormControl('', [Validators.required]),
    numPasseport: new FormControl('', []),
    dateExpiration: new FormControl('', []),
    groupe_convention_id: new FormControl('', []),
    black: new FormControl(false, []),
    groupe_convention: new FormControl('', []),
  });
  isLoadingSpinnerSubscription: Subscription;
  loadOneVoyageurSuccessSubscription: Subscription;
  updateVoyageurSuccessSubscription: Subscription;
  isLoadingSpinner: boolean;
  permissions: Permission[];
  groupesConvention: Observable<GroupeConvention[]>;

  constructor(public dialogRef: MatDialogRef<DialogUpdateVoyageurComponent>,
              // @Inject(MAT_DIALOG_DATA) public data: { id: number },
              private  updates$: Actions,
              private voyageurState: Store<VoyageurState>,
              private dialog: MatDialog, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.loadOneVoyageurSuccessSubscription = this.updates$.pipe(ofType(
      VoyageurActionTypes.LoadOneVoyageurSuccess), map((action: LoadOneVoyageurSuccess) => {
        this.elementForm.patchValue({
          id: action.payload.voyageur.id,
          nom: action.payload.voyageur.nom,
          prenom: action.payload.voyageur.prenom,
          cin: action.payload.voyageur.cin,
          tel: action.payload.voyageur.tel,
          email: action.payload.voyageur.email,
          sexe: action.payload.voyageur.sexe,
          stadeVie: action.payload.voyageur.stadeVie,
          numPasseport: action.payload.voyageur.numPasseport,
          dateExpiration: action.payload.voyageur.dateExpiration,
          black: action.payload.voyageur.black,
          groupe_convention_id: action.payload.voyageur.groupe_convention_id
        });
        if (action.payload.voyageur.groupeConvention) {
          this.elementForm.patchValue({groupe_convention: action.payload.voyageur.groupeConvention.nom});
        }
        // this.dialogRef.close(false);
      })
    ).subscribe();
    this.voyageurState.dispatch(new LoadGroupeConventionsIsNotLoadedRequest());
    this.groupesConvention = this.voyageurState.select(selectAllGroupeConventions);
    this.isLoadingSpinnerSubscription = this.voyageurState.select(selectVoyageurIsLoadingSpinner).subscribe(value => {
      this.isLoadingSpinner = value;
    });
  }

  ngOnDestroy(): void {
    this.isLoadingSpinnerSubscription.unsubscribe();
    this.loadOneVoyageurSuccessSubscription.unsubscribe();
    this.updateVoyageurSuccessSubscription.unsubscribe();
  }

  save() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '440px';
    dialogConfig.data = {titre: 'Modification', body: 'Voulez-vous enregistrer la modification ?'};
    this.dialog.open(ConfirmComponent, dialogConfig).afterClosed().subscribe(value => {
      if (value) {
        const data = this.elementForm.value;
        delete data.groupe_convention;
        this.voyageurState.dispatch(new UpdateVoyageurRequest({voyageur: {...data}}));
      }
    });
  }

  close() {
    this.dialogRef.close(false);
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

  onSelectGroupeConvention($event: MatAutocompleteSelectedEvent) {
    this.elementForm.patchValue({
      groupe_convention: $event.option.value.nom,
      groupe_convention_id: $event.option.value.id,
    });
  }

  addGroupeConvention() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.dialog.open(DialogAddGroupeConventionComponent, dialogConfig);
  }
}
