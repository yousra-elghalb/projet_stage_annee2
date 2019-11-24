import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig, MatTableDataSource} from '@angular/material';
import {Voyage} from '../../model/voyage';
import {select, Store} from '@ngrx/store';
import {VoyageState} from '../../store/voyage.reducer';
import {selectAllVoyages, selectVoyagePaginatorInformations, selectVoyageSearch} from '../../store/voyage.selectors';
import {ConfirmComponent} from '../../../../layouts/alerts/confirm/confirm.component';
import {DeleteVoyageRequest, LoadOneVoyageRequest, LoadVoyagesRequest} from '../../store/voyage.actions';
import {Observable} from 'rxjs';
import {UserPermissions} from '../../../user/model/user-permissions';
import {selectUserPermissions} from '../../../user/store/user.selectors';
import {PaginatorInformations} from '../../../../shared_models/paginator-informations';
import {DialogAddCategorieComponent} from '../../../categorie/views/dialog-add-categorie/dialog-add-categorie.component';
import {DialogAddOffreVoyageComponent} from '../../../offre-voyage/views/dialog-add-offre-voyage/dialog-add-offre-voyage.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {


  displayedColumns: string[] = ['code', 'nom', 'description', 'minPlace', 'maxPlace', 'prixAdulte', 'prixEnfant',
    'prixBebe', 'categorie', 'sous_categorie', 'villesDepart', 'actions'];
  dataSource: MatTableDataSource<Voyage>;
  paginatorInformations: PaginatorInformations = {per_page: 15, current_page: 1};
  search: string;
  userPermission: Observable<UserPermissions>;

  constructor(
    private store: Store<VoyageState>,
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.userPermission = this.store.select(selectUserPermissions);
    this.store.pipe(select(selectAllVoyages)).subscribe(value => {
      this.dataSource = new MatTableDataSource(value);
    });
    this.store.pipe(select(selectVoyagePaginatorInformations)).subscribe(value => {
      this.paginatorInformations = value;
    });
    this.store.pipe(select(selectVoyageSearch)).subscribe(value => {
      this.search = value;
    });
  }

  delete(selectedId: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {titre: 'Suppression', body: 'Voulez-vous supprimer ?'};
    dialogConfig.width = '440px';
    this.dialog.open(ConfirmComponent, dialogConfig).afterClosed().subscribe(value => {
      if (value) {
        this.store.dispatch(new DeleteVoyageRequest({id: selectedId}));
      }
    });
  }

  change(paginator) {
    this.store.dispatch(new LoadVoyagesRequest(
      this.search,
      {
        current_page: paginator.pageIndex + 1,
        per_page: paginator.pageSize
      }));
  }

  onSearch($event: any) {
    this.store.dispatch(new LoadVoyagesRequest(
      $event,
      {
        current_page: this.paginatorInformations.current_page,
        per_page: this.paginatorInformations.per_page
      }));
  }

  addOffreVoyage(voyage) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '900px';
    dialogConfig.data = {...voyage};
    this.dialog.open(DialogAddOffreVoyageComponent, dialogConfig);
  }
}
