import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {ConfirmComponent} from '../../../../layouts/alerts/confirm/confirm.component';
import {Store} from '@ngrx/store';
import {OffreVoyage} from '../../../offre-voyage/model/offre-voyage';
import {Observable, Subscription} from 'rxjs';
import {Actions, ofType} from '@ngrx/effects';
import {map} from 'rxjs/operators';
import {LoadCommercialsIsNotLoadedRequest} from '../../../commercial/store/commercial.actions';
import {selectAllCommerciauxExterne, selectCommercialIsLoading} from '../../../commercial/store/commercial.selectors';
import {Commercial} from '../../../commercial/model/commercial';
import {OffreVoyageLimitedState} from '../../store/offre-voyage-limited.reducer';
import {
  OffreVoyageLimitedActionTypes, SaveOffreVoyageLimitedRequest,
  UpdateOffreVoyageLimitedRequest
} from '../../store/offre-voyage-limited.actions';
import {selectOffreVoyageLimitedIsLoadingSpinner} from '../../store/offre-voyage-limited.selectors';

@Component({
  selector: 'app-dialog-update-offre-voyage-limited',
  templateUrl: './dialog-update-offre-voyage-limited.component.html',
  styleUrls: ['./dialog-update-offre-voyage-limited.component.scss']
})
export class DialogUpdateOffreVoyageLimitedComponent implements OnInit, OnDestroy {
  elementForm = new FormGroup({
    commerciaux: this.fb.array([this.newFormGroupOffreVoyageLimited()]),

  });

  isLoadingSpinnerSubscription: Subscription;
  updateOffreVoyageSuccessSubscription: Subscription;
  isLoadingSpinner: boolean;
  commercialIsLoading: Observable<boolean>;
  commerciaux: Observable<Commercial[]>;

  constructor(public dialogRef: MatDialogRef<DialogUpdateOffreVoyageLimitedComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { offreVoyage: OffreVoyage },
              private fb: FormBuilder,
              private  updates$: Actions,
              private offreVoyageState: Store<OffreVoyageLimitedState>,
              private dialog: MatDialog) {
  }

  newFormGroupOffreVoyageLimited(): FormGroup {
    return this.fb.group({
      nbPlace: new FormControl('', [Validators.required, Validators.min(0), Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]),
      optionalDate: new FormControl(new Date(), [Validators.required]),
      offre_voyage_id: new FormControl(this.data.offreVoyage.id, [Validators.required]),
      commercial_id: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.offreVoyageState.dispatch(new LoadCommercialsIsNotLoadedRequest());
    this.commercialIsLoading = this.offreVoyageState.select(selectCommercialIsLoading);
    this.commerciaux = this.offreVoyageState.select(selectAllCommerciauxExterne);
    this.offreVoyageState.select(selectAllCommerciauxExterne).subscribe(value => {
      console.warn(value);
    });
    this.updateOffreVoyageSuccessSubscription = this.updates$.pipe(ofType(
      OffreVoyageLimitedActionTypes.SaveOffreVoyageLimitedSuccess), map((action) => {
        this.dialogRef.close(false);
      })
    ).subscribe();
    this.isLoadingSpinnerSubscription = this.offreVoyageState.select(selectOffreVoyageLimitedIsLoadingSpinner)
      .subscribe(value => {
        this.isLoadingSpinner = value;
      });
  }

  ngOnDestroy(): void {
    this.isLoadingSpinnerSubscription.unsubscribe();
    this.updateOffreVoyageSuccessSubscription.unsubscribe();
  }

  save() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '440px';
    dialogConfig.data = {titre: 'Modification', body: 'Voulez-vous enregistrer la modification ?'};
    this.dialog.open(ConfirmComponent, dialogConfig).afterClosed().subscribe(value => {
      if (value) {
        this.offreVoyageState.dispatch(new SaveOffreVoyageLimitedRequest({
          data: this.elementForm.value.commerciaux
        }));
      }
    });
  }

  close() {
    this.dialogRef.close(false);
  }

  addCommercial() {
    const items = this.elementForm.get('commerciaux') as FormArray;
    items.push(this.newFormGroupOffreVoyageLimited());
  }

  removeCommercial(index) {
    const items = this.elementForm.get('commerciaux') as FormArray;
    if (items.length > 1) {
      items.removeAt(index);
    }
  }

}
