import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {Actions, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {CategorieState} from '../../store/categorie.reducer';
import {LoadOneCategorieSuccess, CategorieActionTypes, UpdateCategorieRequest} from '../../store/categorie.actions';
import {map} from 'rxjs/operators';
import {selectCategorieIsLoadingSpinner} from '../../store/categorie.selectors';
import {ConfirmComponent} from '../../../../layouts/alerts/confirm/confirm.component';
import {DialogAddSousCategorieComponent} from '../../../sous-categorie/views/dialog-add-sous-categorie/dialog-add-sous-categorie.component';
import {DialogAddCategorieComponent} from '../dialog-add-categorie/dialog-add-categorie.component';
import {SousCategorieState} from '../../../sous-categorie/store/sous-categorie.reducer';
import {AddAllChipsSousCategories} from '../../../sous-categorie/store/sous-categorie.actions';
import {selectedChipsSousCategories} from '../../../sous-categorie/store/sous-categorie.selectors';
import {selectUserPermissions} from '../../../user/store/user.selectors';
import {UserPermissions} from '../../../user/model/user-permissions';

@Component({
  selector: 'app-dialog-update-categorie',
  templateUrl: './dialog-update-categorie.component.html',
  styleUrls: ['./dialog-update-categorie.component.scss']
})
export class DialogUpdateCategorieComponent implements OnInit, OnDestroy {

  elementForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    nom: new FormControl('', [Validators.required]),
    sousCategories: new FormControl(''),
  });
  isLoadingSpinnerSubscription: Subscription;
  loadOneCategorieSuccessSubscription: Subscription;
  updateCategorieSuccessSubscription: Subscription;
  isLoadingSpinner: boolean;
  sousCategories: number[];
  userPermission: Observable<UserPermissions>;

  constructor(public dialogRef: MatDialogRef<DialogUpdateCategorieComponent>,
              // @Inject(MAT_DIALOG_DATA) public data: { id: number },
              private  updates$: Actions,
              private categorieState: Store<CategorieState>,
              private sousCategorieState: Store<SousCategorieState>,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.userPermission = this.categorieState.select(selectUserPermissions);
    this.loadOneCategorieSuccessSubscription = this.updates$.pipe(ofType(
      CategorieActionTypes.LoadOneCategorieSuccess), map((action: LoadOneCategorieSuccess) => {
        this.sousCategorieState.dispatch(new AddAllChipsSousCategories({sousCategories: action.payload.categorie.sousCategories}));
        this.elementForm.setValue({
          id: action.payload.categorie.id,
          nom: action.payload.categorie.nom,
          sousCategories: ''
        })
        ;
        // this.dialogRef.close(false);
      })
    ).subscribe();

    this.updateCategorieSuccessSubscription = this.updates$.pipe(ofType(
      CategorieActionTypes.UpdateCategorieSuccess), map((action: LoadOneCategorieSuccess) => {
        this.dialogRef.close(false);
      })
    ).subscribe();
    this.isLoadingSpinnerSubscription = this.categorieState.select(selectCategorieIsLoadingSpinner).subscribe(value => {
      this.isLoadingSpinner = value;
    });
    this.sousCategorieState.select(selectedChipsSousCategories).subscribe(value => {
      this.sousCategories = value.map(value1 => value1.id);
    });
  }

  ngOnDestroy(): void {
    this.isLoadingSpinnerSubscription.unsubscribe();
    this.loadOneCategorieSuccessSubscription.unsubscribe();
    this.updateCategorieSuccessSubscription.unsubscribe();
  }

  save() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '440px';
    dialogConfig.data = {titre: 'Modification', body: 'Voulez-vous enregistrer la modification ?'};
    this.dialog.open(ConfirmComponent, dialogConfig).afterClosed().subscribe(value => {
      if (value) {
        console.warn(this.elementForm.value);
        this.categorieState.dispatch(new UpdateCategorieRequest({
          categorie: {
            ...this.elementForm.value,
            sousCategories: this.sousCategories
          }
        }));
      }
    });
  }

  close() {
    this.dialogRef.close(false);
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
