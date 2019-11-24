import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig, MatTableDataSource} from '@angular/material';
import {PaginatorInformations} from '../../../../shared_models/paginator-informations';
import {select, Store} from '@ngrx/store';
import {
  selectAllCategories,
  selectCategorieSearch
} from '../../store/categorie.selectors';
import {ConfirmComponent} from '../../../../layouts/alerts/confirm/confirm.component';
import {DeleteCategorieRequest, LoadOneCategorieRequest, LoadCategoriesRequest} from '../../store/categorie.actions';
import {DialogAddCategorieComponent} from '../dialog-add-categorie/dialog-add-categorie.component';
import {DialogUpdateCategorieComponent} from '../dialog-update-categorie/dialog-update-categorie.component';
import {Categorie} from '../../model/categorie';
import {CategorieState} from '../../store/categorie.reducer';
import {Observable} from 'rxjs';
import {UserPermissions} from '../../../user/model/user-permissions';
import {selectUserPermissions} from '../../../user/store/user.selectors';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {


  displayedColumns: string[] = ['id', 'nom', 'actions'];
  dataSource: MatTableDataSource<Categorie>;
  search: string;
  userPermission: Observable<UserPermissions>;

  constructor(private store: Store<CategorieState>, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.userPermission = this.store.select(selectUserPermissions);
    this.store.pipe(select(selectAllCategories)).subscribe(value => {
      this.dataSource = new MatTableDataSource(value);
    });
    this.store.pipe(select(selectCategorieSearch)).subscribe(value => {
      this.search = value;
    });
  }

  delete(selectedId: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {titre: 'Suppression', body: 'Voulez-vous supprimer ?'};
    dialogConfig.width = '440px';
    this.dialog.open(ConfirmComponent, dialogConfig).afterClosed().subscribe(value => {
      if (value) {
        this.store.dispatch(new DeleteCategorieRequest({id: selectedId}));
      }
    });
  }

  change(paginator) {
    this.store.dispatch(new LoadCategoriesRequest(
      this.search));
  }

  newElement() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.dialog.open(DialogAddCategorieComponent, dialogConfig);
  }

  update(selectedId: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.store.dispatch(new LoadOneCategorieRequest({id: selectedId}));
    this.dialog.open(DialogUpdateCategorieComponent, dialogConfig);
  }

  onSearch($event: any) {
    this.store.dispatch(new LoadCategoriesRequest(
      $event));
  }
}
