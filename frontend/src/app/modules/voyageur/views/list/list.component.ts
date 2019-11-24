import {Component, OnInit} from '@angular/core';
import {
  selectAllVoyageurs,
  selectFeatureVoyageurs,
  selectVoyageurPaginatorInformations,
  selectVoyageurSearch
} from '../../store/voyageur.selectors';
import {select, Store} from '@ngrx/store';
import {VoyageurState} from '../../store/voyageur.reducer';
import {Voyageur} from '../../model/voyageur';
import {MatDialog, MatDialogConfig, MatTableDataSource} from '@angular/material';
import {PaginatorInformations} from '../../../../shared_models/paginator-informations';
import {DeleteVoyageurRequest, LoadOneVoyageurRequest, LoadVoyageursRequest} from '../../store/voyageur.actions';
import {ConfirmComponent} from '../../../../layouts/alerts/confirm/confirm.component';
import {DialogAddVoyageurComponent} from '../dialog-add-voyageur/dialog-add-voyageur.component';
import {DialogUpdateVoyageurComponent} from '../dialog-update-voyageur/dialog-update-voyageur.component';
import {Observable} from 'rxjs';
import {UserPermissions} from '../../../user/model/user-permissions';
import {selectUserPermissions} from '../../../user/store/user.selectors';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  displayedColumns: string[] = ['id',
    'cin',
    'nom',
    'prenom',
    'tel',
    'email',
    'sexe',
    'stadeVie',
    'numPasseport',
    'dateExpiration',
    'groupeConvention',
    'reduction',
    'fidele',
    'actions'];
  dataSource: MatTableDataSource<Voyageur>;
  paginatorInformations: PaginatorInformations = {per_page: 15, current_page: 1};
  search: string;
  userPermission: Observable<UserPermissions>;
  fidele: any;
  black: string;

  constructor(private store: Store<VoyageurState>, private dialog: MatDialog, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.userPermission = this.store.select(selectUserPermissions);
    this.store.pipe(select(selectAllVoyageurs)).subscribe(value => {
      this.dataSource = new MatTableDataSource(value);
    });
    this.route.paramMap.subscribe(value => {
      this.fidele = value.get('fidele');
      this.black = value.get('black');
    });
    this.store.pipe(select(selectFeatureVoyageurs)).subscribe(value => {
      this.paginatorInformations = value.paginatorInformations;
      this.search = value.search;
    });
  }

  delete(selectedId: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {titre: 'Suppression', body: 'Voulez-vous supprimer ?'};
    dialogConfig.width = '440px';
    this.dialog.open(ConfirmComponent, dialogConfig).afterClosed().subscribe(value => {
      if (value) {
        this.store.dispatch(new DeleteVoyageurRequest({id: selectedId}));
      }
    });
  }

  change(paginator) {
    this.store.dispatch(new LoadVoyageursRequest(this.black, this.fidele,
      this.search,
      {
        current_page: paginator.pageIndex + 1,
        per_page: paginator.pageSize
      }));
  }

  onSearch($event: any) {
    this.store.dispatch(new LoadVoyageursRequest(this.black, this.fidele,
      $event,
      {
        current_page: this.paginatorInformations.current_page,
        per_page: this.paginatorInformations.per_page
      }));
  }

  newElement() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.dialog.open(DialogAddVoyageurComponent, dialogConfig);
  }

  update(selectedId: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.store.dispatch(new LoadOneVoyageurRequest({id: selectedId}));
    this.dialog.open(DialogUpdateVoyageurComponent, dialogConfig);
  }


}
