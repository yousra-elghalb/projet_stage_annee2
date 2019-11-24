import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {Actions, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {map} from 'rxjs/operators';
import {ConfirmComponent} from '../../../../layouts/alerts/confirm/confirm.component';
import {HotelState} from '../../store/hotel.reducer';
import {selectHotelIsLoadingSpinner} from '../../store/hotel.selectors';
import {LoadOneHotelSuccess, HotelActionTypes, UpdateHotelRequest} from '../../store/hotel.actions';

@Component({
  selector: 'app-dialog-update-hotel',
  templateUrl: './dialog-update-hotel.component.html',
  styleUrls: ['./dialog-update-hotel.component.scss']
})
export class DialogUpdateHotelComponent implements OnInit, OnDestroy {

  elementForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    nom: new FormControl('', [Validators.required]),
    cat: new FormControl('', [Validators.required]),
    formule: new FormControl('', [Validators.required]),
    rib: new FormControl('', []),
    responsable: new FormControl('', [Validators.required]),
  });
  isLoadingSpinnerSubscription: Subscription;
  loadOneHotelSuccessSubscription: Subscription;
  updateHotelSuccessSubscription: Subscription;
  isLoadingSpinner: boolean;

  constructor(public dialogRef: MatDialogRef<DialogUpdateHotelComponent>,
              // @Inject(MAT_DIALOG_DATA) public data: { id: number },
              private  updates$: Actions,
              private hotelState: Store<HotelState>,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.loadOneHotelSuccessSubscription = this.updates$.pipe(ofType(
      HotelActionTypes.LoadOneHotelSuccess), map((action: LoadOneHotelSuccess) => {
        this.elementForm.setValue({
          id: action.payload.hotel.id,
          nom: action.payload.hotel.nom,
          cat: action.payload.hotel.cat,
          formule: action.payload.hotel.formule,
          rib: action.payload.hotel.rib,
          responsable: action.payload.hotel.responsable,
        });
        // this.dialogRef.close(false);
      })
    ).subscribe();

    this.updateHotelSuccessSubscription = this.updates$.pipe(ofType(
      HotelActionTypes.UpdateHotelSuccess), map((action: LoadOneHotelSuccess) => {
        this.dialogRef.close(false);
      })
    ).subscribe();
    this.isLoadingSpinnerSubscription = this.hotelState.select(selectHotelIsLoadingSpinner).subscribe(value => {
      this.isLoadingSpinner = value;
    });
  }

  ngOnDestroy(): void {
    this.isLoadingSpinnerSubscription.unsubscribe();
    this.loadOneHotelSuccessSubscription.unsubscribe();
    this.updateHotelSuccessSubscription.unsubscribe();
  }

  save() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '440px';
    dialogConfig.data = {titre: 'Modification', body: 'Voulez-vous enregistrer la modification ?'};
    this.dialog.open(ConfirmComponent, dialogConfig).afterClosed().subscribe(value => {
      if (value) {
        console.warn(this.elementForm.value);
        this.hotelState.dispatch(new UpdateHotelRequest({hotel: this.elementForm.value}));
      }
    });
  }

  close() {
    this.dialogRef.close(false);
  }

}
