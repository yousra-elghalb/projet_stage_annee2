import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {Actions, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {SousCategorieState} from '../../store/sous-categorie.reducer';
import {LoadOneSousCategorieSuccess, SousCategorieActionTypes, UpdateSousCategorieRequest} from '../../store/sous-categorie.actions';
import {map} from 'rxjs/operators';
import {selectSousCategorieIsLoadingSpinner} from '../../store/sous-categorie.selectors';
import {ConfirmComponent} from '../../../../layouts/alerts/confirm/confirm.component';

@Component({
  selector: 'app-dialog-update-sous-categorie',
  templateUrl: './dialog-update-sous-categorie.component.html',
  styleUrls: ['./dialog-update-sous-categorie.component.scss']
})
export class DialogUpdateSousCategorieComponent implements OnInit, OnDestroy {

  elementForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    nom: new FormControl('', [Validators.required]),
  });
  isLoadingSpinnerSubscription: Subscription;
  loadOneSousCategorieSuccessSubscription: Subscription;
  updateSousCategorieSuccessSubscription: Subscription;
  isLoadingSpinner: boolean;

  constructor(public dialogRef: MatDialogRef<DialogUpdateSousCategorieComponent>,
              // @Inject(MAT_DIALOG_DATA) public data: { id: number },
              private  updates$: Actions,
              private sousCategorieState: Store<SousCategorieState>,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.loadOneSousCategorieSuccessSubscription = this.updates$.pipe(ofType(
      SousCategorieActionTypes.LoadOneSousCategorieSuccess), map((action: LoadOneSousCategorieSuccess) => {
        this.elementForm.setValue({
          id: action.payload.sousCategorie.id,
          nom: action.payload.sousCategorie.nom
        });
        // this.dialogRef.close(false);
      })
    ).subscribe();

    this.updateSousCategorieSuccessSubscription = this.updates$.pipe(ofType(
      SousCategorieActionTypes.UpdateSousCategorieSuccess), map((action: LoadOneSousCategorieSuccess) => {
        this.dialogRef.close(false);
      })
    ).subscribe();
    this.isLoadingSpinnerSubscription = this.sousCategorieState.select(selectSousCategorieIsLoadingSpinner).subscribe(value => {
      this.isLoadingSpinner = value;
    });
  }

  ngOnDestroy(): void {
    this.isLoadingSpinnerSubscription.unsubscribe();
    this.loadOneSousCategorieSuccessSubscription.unsubscribe();
    this.updateSousCategorieSuccessSubscription.unsubscribe();
  }

  save() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '440px';
    dialogConfig.data = {titre: 'Modification', body: 'Voulez-vous enregistrer la modification ?'};
    this.dialog.open(ConfirmComponent, dialogConfig).afterClosed().subscribe(value => {
      if (value) {
        console.warn(this.elementForm.value);
        this.sousCategorieState.dispatch(new UpdateSousCategorieRequest({sousCategorie: this.elementForm.value}));
      }
    });
  }

  close() {
    this.dialogRef.close(false);
  }

}
