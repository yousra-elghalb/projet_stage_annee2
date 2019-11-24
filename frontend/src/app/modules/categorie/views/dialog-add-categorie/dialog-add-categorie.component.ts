import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {MatDialog, MatDialogConfig, MatDialogRef, MatSnackBar} from '@angular/material';
import {Store} from '@ngrx/store';
import {CategorieState} from '../../store/categorie.reducer';
import {Actions, ofType} from '@ngrx/effects';
import {selectCategorieIsLoadingSpinner} from '../../store/categorie.selectors';
import {CategorieActionTypes, SaveCategorieRequest} from '../../store/categorie.actions';
import {map} from 'rxjs/operators';
import {ConfirmComponent} from '../../../../layouts/alerts/confirm/confirm.component';
import {SousCategorie} from '../../../sous-categorie/model/sous-categorie';
import {SousCategorieState} from '../../../sous-categorie/store/sous-categorie.reducer';
import {selectAllSousCategories, selectedChipsSousCategories} from '../../../sous-categorie/store/sous-categorie.selectors';
import {DialogAddSousCategorieComponent} from '../../../sous-categorie/views/dialog-add-sous-categorie/dialog-add-sous-categorie.component';
import {selectUserPermissions} from '../../../user/store/user.selectors';
import {UserPermissions} from '../../../user/model/user-permissions';

@Component({
  selector: 'app-dialog-add-categorie',
  templateUrl: './dialog-add-categorie.component.html',
  styleUrls: ['./dialog-add-categorie.component.scss']
})
export class DialogAddCategorieComponent implements OnInit, OnDestroy {
  elementForm = new FormGroup({
    nom: new FormControl('', [Validators.required]),
    sousCategories: new FormControl(''),
  });
  isLoadingSpinner: boolean;
  isLoadingSpinnerSubscription: Subscription;
  updatesSubscription: Subscription;
  sousCategories: number[];
  userPermission: Observable<UserPermissions>;

  constructor(
    public dialogRef: MatDialogRef<DialogAddCategorieComponent>,
    private categorieState: Store<CategorieState>,
    private sousCategorieState: Store<SousCategorieState>,
    private snackBar: MatSnackBar,
    private  updates$: Actions,
    private dialog: MatDialog) {
  }

  ngOnInit() {
    this.userPermission = this.categorieState.select(selectUserPermissions);

    this.isLoadingSpinnerSubscription = this.categorieState.select(selectCategorieIsLoadingSpinner).subscribe(value => {
      this.isLoadingSpinner = value;
    });
    this.updatesSubscription = this.updates$.pipe(ofType(
      CategorieActionTypes.SaveCategorieSuccess), map(value => {
        this.dialogRef.close(false);
      })
    ).subscribe();
    this.sousCategorieState.select(selectedChipsSousCategories).subscribe(value => {
      this.sousCategories = value.map(value1 => value1.id);
    });
  }

  ngOnDestroy(): void {
    this.isLoadingSpinnerSubscription.unsubscribe();
    this.updatesSubscription.unsubscribe();
  }

  save() {
    console.log(this.elementForm.value, this.sousCategories);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '440px';
    dialogConfig.data = {titre: 'Ajout', body: 'Voulez-vous Entregistrer ?'};
    this.dialog.open(ConfirmComponent, dialogConfig).afterClosed().subscribe(value => {
      if (value) {
        this.categorieState.dispatch(new SaveCategorieRequest({
          categorie: {
            nom: this.elementForm.value.nom,
            sousCategories: this.sousCategories
          }
        }));
      }
    });
  }

  reset() {
    // const formControl: FormControl = this.elementForm.get('sousCategories');
    // formControl.setValue('');
    this.elementForm.setValue({nom: ''});
  }

  addSousCategorie() {
    this.dialogRef.close(false);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.dialog.open(DialogAddSousCategorieComponent, dialogConfig).beforeClosed().subscribe(value => {
      this.dialog.open(DialogAddCategorieComponent, dialogConfig);
    });
  }
}
