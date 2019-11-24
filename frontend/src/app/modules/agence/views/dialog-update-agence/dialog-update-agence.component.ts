import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {Actions, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {map} from 'rxjs/operators';
import {ConfirmComponent} from '../../../../layouts/alerts/confirm/confirm.component';
import {AgenceState} from '../../store/agence.reducer';
import {selectAgenceIsLoadingSpinner} from '../../store/agence.selectors';
import {LoadOneAgenceSuccess, AgenceActionTypes, UpdateAgenceRequest} from '../../store/agence.actions';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-dialog-update-agence',
  templateUrl: './dialog-update-agence.component.html',
  styleUrls: ['./dialog-update-agence.component.scss']
})
export class DialogUpdateAgenceComponent implements OnInit, OnDestroy {

  elementForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    nom: new FormControl('', [Validators.required]),
    logo: new FormControl('', []),
    fax: new FormControl('', [Validators.required]),
    adresse: new FormControl('', [Validators.required]),
    tel: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email]),
  });
  isLoadingSpinnerSubscription: Subscription;
  loadOneAgenceSuccessSubscription: Subscription;
  updateAgenceSuccessSubscription: Subscription;
  isLoadingSpinner: boolean;
  baseUrl = environment.baseUrl;
   logoBase64: string;
  logo: string;
   logoChnaged = false;

  constructor(public dialogRef: MatDialogRef<DialogUpdateAgenceComponent>,
              // @Inject(MAT_DIALOG_DATA) public data: { id: number },
              private  updates$: Actions,
              private agenceState: Store<AgenceState>,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.loadOneAgenceSuccessSubscription = this.updates$.pipe(ofType(
      AgenceActionTypes.LoadOneAgenceSuccess), map((action: LoadOneAgenceSuccess) => {
        this.elementForm.setValue({
          id: action.payload.agence.id,
          nom: action.payload.agence.nom,
          logo: action.payload.agence.logo,
          fax: action.payload.agence.fax,
          adresse: action.payload.agence.adresse,
          tel: action.payload.agence.tel,
          email: action.payload.agence.email,
        });
        this.logo = action.payload.agence.logo;
        // this.dialogRef.close(false);
      })
    ).subscribe();

    this.updateAgenceSuccessSubscription = this.updates$.pipe(ofType(
      AgenceActionTypes.UpdateAgenceSuccess), map((action: LoadOneAgenceSuccess) => {
        this.dialogRef.close(false);
      })
    ).subscribe();
    this.isLoadingSpinnerSubscription = this.agenceState.select(selectAgenceIsLoadingSpinner).subscribe(value => {
      this.isLoadingSpinner = value;
    });
  }

  ngOnDestroy(): void {
    this.isLoadingSpinnerSubscription.unsubscribe();
    this.loadOneAgenceSuccessSubscription.unsubscribe();
    this.updateAgenceSuccessSubscription.unsubscribe();
  }

  save() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '440px';
    dialogConfig.data = {titre: 'Modification', body: 'Voulez-vous enregistrer la modification ?'};
    this.dialog.open(ConfirmComponent, dialogConfig).afterClosed().subscribe(value => {
      if (value) {
        console.warn(this.elementForm.value);
        this.agenceState.dispatch(new UpdateAgenceRequest({agence: {...this.elementForm.value, logo: this.logo}}));
      }
    });
  }

  close() {
    this.dialogRef.close(false);
  }

  OnChangeImage() {
    this.handleFileSelect(this.elementForm.value.logo._files[0]);
  }

  handleFileSelect(f): any {
    const reader = new FileReader();
    reader.readAsDataURL(f);
    reader.onload = (e) => {
      if (typeof reader.result === 'string') {
        this.logoBase64 = reader.result.split(',')[1];
        this.logo = reader.result;
      }
    };
  }
}
