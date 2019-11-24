import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {MatDialog, MatDialogConfig, MatDialogRef, MatSnackBar} from '@angular/material';
import {Store} from '@ngrx/store';
import {HotelState} from '../../store/hotel.reducer';
import {Actions, ofType} from '@ngrx/effects';
import {selectHotelIsLoadingSpinner} from '../../store/hotel.selectors';
import {HotelActionTypes, SaveHotelRequest} from '../../store/hotel.actions';
import {map} from 'rxjs/operators';
import {ConfirmComponent} from '../../../../layouts/alerts/confirm/confirm.component';

@Component({
  selector: 'app-dialog-add-hotel',
  templateUrl: './dialog-add-hotel.component.html',
  styleUrls: ['./dialog-add-hotel.component.scss']
})
export class DialogAddHotelComponent implements OnInit, OnDestroy {
  elementForm = new FormGroup({
    nom: new FormControl('', [Validators.required]),
    cat: new FormControl('', [Validators.required]),
    formule: new FormControl('', [Validators.required]),
    rib: new FormControl('', []),
    responsable: new FormControl('', [Validators.required]),
  });

  isLoadingSpinner: boolean;
  isLoadingSpinnerSubscription: Subscription;
  updatesSubscription: Subscription;

  constructor(public dialogRef: MatDialogRef<DialogAddHotelComponent>,
              private hotelState: Store<HotelState>,
              private snackBar: MatSnackBar,
              private  updates$: Actions,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.isLoadingSpinnerSubscription = this.hotelState.select(selectHotelIsLoadingSpinner).subscribe(value => {
      this.isLoadingSpinner = value;
    });
    this.updatesSubscription = this.updates$.pipe(ofType(
      HotelActionTypes.SaveHotelSuccess), map(value => {
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
        this.hotelState.dispatch(new SaveHotelRequest({hotel: this.elementForm.value}));
      }
    });
  }

  reset() {
    this.elementForm.setValue({nom: ''});
  }

  onRatingChanged($event) {

  }
}
