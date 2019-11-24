import {Component, OnInit} from '@angular/core';
import {
  selectAllOffreVoyageLimiteds, selectOffreVoyageLimitedPaginatorInformations,
  selectOffreVoyageLimitedSearch
} from '../../store/offre-voyage-limited.selectors';
import {select, Store} from '@ngrx/store';
import {OffreVoyageLimitedState} from '../../store/offre-voyage-limited.reducer';
import {OffreVoyageLimited} from '../../model/offre-voyage-limited';
import {MatDialog, MatDialogConfig, MatTableDataSource} from '@angular/material';
import {PaginatorInformations} from '../../../../shared_models/paginator-informations';
import {
  DeleteOffreVoyageLimitedRequest,
  LoadOneOffreVoyageLimitedRequest,
  LoadOffreVoyageLimitedsRequest, LoadOffreVoyageLimitedByOffreVoyageIdsRequest
} from '../../store/offre-voyage-limited.actions';
import {ConfirmComponent} from '../../../../layouts/alerts/confirm/confirm.component';
import {DialogAddOffreVoyageLimitedComponent} from '../dialog-add-offre-voyage-limited/dialog-add-offre-voyage-limited.component';
import {DialogUpdateOffreVoyageLimitedComponent} from '../dialog-update-offre-voyage-limited/dialog-update-offre-voyage-limited.component';
import {Observable} from 'rxjs';
import {UserPermissions} from '../../../user/model/user-permissions';
import {selectUserPermissions} from '../../../user/store/user.selectors';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-list-offre-voyage-limited',
  templateUrl: './list-offre-voyage-limited.component.html',
  styleUrls: ['./list-offre-voyage-limited.component.scss']
})
export class ListOffreVoyageLimitedComponent implements OnInit {

  displayedColumns: string[] = ['id',
    'Commercial externe',
    'Date optionnelle',
    'nombe de place',
    'actions'];
  dataSource: MatTableDataSource<OffreVoyageLimited>;
  paginatorInformations: PaginatorInformations = {per_page: 15, current_page: 1};
  search: string;
  userPermission: Observable<UserPermissions>;
  private offId: string;

  constructor(private store: Store<OffreVoyageLimitedState>, private dialog: MatDialog, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(value => {
      this.offId = value.get('offId');
    });
    this.userPermission = this.store.select(selectUserPermissions);
    this.store.pipe(select(selectAllOffreVoyageLimiteds)).subscribe(value => {
      this.dataSource = new MatTableDataSource(value);
    });
    this.store.pipe(select(selectOffreVoyageLimitedPaginatorInformations)).subscribe(value => {
      this.paginatorInformations = value;
    });
    this.store.pipe(select(selectOffreVoyageLimitedSearch)).subscribe(value => {
      this.search = value;
    });
  }

  delete(selectedId: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {titre: 'Suppression', body: 'Voulez-vous supprimer ?'};
    dialogConfig.width = '440px';
    this.dialog.open(ConfirmComponent, dialogConfig).afterClosed().subscribe(value => {
      if (value) {
        this.store.dispatch(new DeleteOffreVoyageLimitedRequest({id: selectedId}));
      }
    });
  }

  change(paginator) {
    this.store.dispatch(new LoadOffreVoyageLimitedByOffreVoyageIdsRequest(this.offId,
      this.search,
      {
        current_page: paginator.pageIndex + 1,
        per_page: paginator.pageSize
      }));
  }

  onSearch($event: any) {
    this.store.dispatch(new LoadOffreVoyageLimitedByOffreVoyageIdsRequest(this.offId, $event, {
      current_page: this.paginatorInformations.current_page,
      per_page: this.paginatorInformations.per_page
    }));
  }

  newElement() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.dialog.open(DialogAddOffreVoyageLimitedComponent, dialogConfig);
  }

  update(selectedId: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.store.dispatch(new LoadOneOffreVoyageLimitedRequest({id: selectedId}));
    this.dialog.open(DialogUpdateOffreVoyageLimitedComponent, dialogConfig);
  }


}
