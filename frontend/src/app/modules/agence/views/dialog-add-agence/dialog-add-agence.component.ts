import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {MatDialog, MatDialogConfig, MatDialogRef, MatSnackBar} from '@angular/material';
import {Store} from '@ngrx/store';
import {AgenceState} from '../../store/agence.reducer';
import {Actions, ofType} from '@ngrx/effects';
import {selectAgenceIsLoadingSpinner} from '../../store/agence.selectors';
import {AgenceActionTypes, SaveAgenceRequest} from '../../store/agence.actions';
import {map} from 'rxjs/operators';
import {ConfirmComponent} from '../../../../layouts/alerts/confirm/confirm.component';

@Component({
  selector: 'app-dialog-add-agence',
  templateUrl: './dialog-add-agence.component.html',
  styleUrls: ['./dialog-add-agence.component.scss']
})
export class DialogAddAgenceComponent implements OnInit, OnDestroy {
  elementForm = new FormGroup({
    nom: new FormControl('', [Validators.required]),
    logo: new FormControl('', []),
    fax: new FormControl('', []),
    adresse: new FormControl('', [Validators.required]),
    tel: new FormControl('', []),
    email: new FormControl('', [Validators.email]),
  });
  isLoadingSpinner: boolean;
  isLoadingSpinnerSubscription: Subscription;
  updatesSubscription: Subscription;
  logo: any;
  logoBase64: string;

  constructor(public dialogRef: MatDialogRef<DialogAddAgenceComponent>,
              private agenceState: Store<AgenceState>,
              private snackBar: MatSnackBar,
              private  updates$: Actions,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.isLoadingSpinnerSubscription = this.agenceState.select(selectAgenceIsLoadingSpinner).subscribe(value => {
      this.isLoadingSpinner = value;
    });
    this.updatesSubscription = this.updates$.pipe(ofType(
      AgenceActionTypes.SaveAgenceSuccess), map(value => {
        this.dialogRef.close(false);
      })
    ).subscribe();
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
        this.agenceState.dispatch(new SaveAgenceRequest({agence: {...this.elementForm.value, logo: this.logo}}));
      }
    });
  }

  reset() {
    this.elementForm.setValue({nom: ''});
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
