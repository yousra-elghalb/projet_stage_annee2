import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig, MatTableDataSource} from '@angular/material';
import {OffreVoyage} from '../../model/offre-voyage';
import {select, Store} from '@ngrx/store';
import {OffreVoyageState} from '../../store/offre-voyage.reducer';
import {selectAllOffreVoyages, selectOffreVoyagePaginatorInformations, selectOffreVoyageSearch} from '../../store/offre-voyage.selectors';
import {ConfirmComponent} from '../../../../layouts/alerts/confirm/confirm.component';
import {
  DeleteOffreVoyageRequest,
  LoadOneOffreVoyageRequest,
  LoadOffreVoyagesLimitedRequest
} from '../../store/offre-voyage.actions';
import {Observable} from 'rxjs';
import {UserPermissions} from '../../../user/model/user-permissions';
import {selectUserPermissions} from '../../../user/store/user.selectors';
import {PaginatorInformations} from '../../../../shared_models/paginator-informations';
import {CriteresRecherche} from '../../model/criteres-recherche';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DialogUpdateOffreVoyageComponent} from '../dialog-update-offre-voyage/dialog-update-offre-voyage.component';
import {ActivatedRoute} from '@angular/router';
import {selectCategorieById} from '../../../categorie/store/categorie.selectors';
import {Categorie} from '../../../categorie/model/categorie';
import {DialogAddOffreVoyageComponent} from '../dialog-add-offre-voyage/dialog-add-offre-voyage.component';
// tslint:disable-next-line:max-line-length
import {DialogAddOffreVoyageLimitedComponent} from '../../../offre-voyage-limited/views/dialog-add-offre-voyage-limited/dialog-add-offre-voyage-limited.component';

@Component({
  selector: 'app-list-offre-voyage-by-commercial-externe.component',
  templateUrl: './list-offre-voyage-by-commercial-externe.component.html',
  styleUrls: ['./list-offre-voyage-by-commercial-externe.component.scss']
})
export class ListOffreVoyageByCommercialExterneComponent implements OnInit {


  displayedColumns: string[] = ['code', 'nom', 'dateDepart', 'dateDarrive',
    'nbPlace', 'enAttente', 'valide',
    'statut',
    'dateoptionelle',
    'sous_categorie',
    'villesDepart',
    'accompagnateur',
    'actions'];
  dataSource: MatTableDataSource<OffreVoyage>;
  paginatorInformations: PaginatorInformations = {per_page: 15, current_page: 1};
  search: CriteresRecherche;
  userPermission: Observable<UserPermissions>;
  elementFormSerach = new FormGroup({
    dateDepart: new FormControl('', []),
    dateDarrive: new FormControl('', []),
    statut: new FormControl('', []),
    sous_categorie_id: new FormControl('', []),
  });
  categorie$: Observable<Categorie>;

  constructor(
    private store: Store<OffreVoyageState>,
    private dialog: MatDialog, private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(value => {
      this.categorie$ = this.store.select(selectCategorieById(value.get('id')));
    });
    this.userPermission = this.store.select(selectUserPermissions);
    this.store.pipe(select(selectAllOffreVoyages)).subscribe(value => {
      this.dataSource = new MatTableDataSource(value);
    });
    this.store.pipe(select(selectOffreVoyagePaginatorInformations)).subscribe(value => {
      this.paginatorInformations = value;
    });
    this.store.pipe(select(selectOffreVoyageSearch)).subscribe(value => {
      this.search = value;
      this.elementFormSerach.patchValue({
        dateDepart: value.dateDepart,
        dateDarrive: value.dateDarrive,
        statut: value.statut,
      });
    });
  }

  delete(selectedId: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {titre: 'Suppression', body: 'Voulez-vous supprimer ?'};
    dialogConfig.width = '440px';
    this.dialog.open(ConfirmComponent, dialogConfig).afterClosed().subscribe(value => {
      if (value) {
        this.store.dispatch(new DeleteOffreVoyageRequest({id: selectedId}));
      }
    });
  }

  change(paginator) {
    this.store.dispatch(new LoadOffreVoyagesLimitedRequest(
      this.search,
      {
        current_page: paginator.pageIndex + 1,
        per_page: paginator.pageSize
      }));
  }

  onSearch($event: any) {
    this.store.dispatch(new LoadOffreVoyagesLimitedRequest(
      {...this.search, search: $event, ...this.elementFormSerach.value},
      {
        current_page: this.paginatorInformations.current_page,
        per_page: this.paginatorInformations.per_page
      }));
  }

  onSearchValue() {
    this.store.dispatch(new LoadOffreVoyagesLimitedRequest(
      {...this.search, ...this.elementFormSerach.value},
      {
        current_page: this.paginatorInformations.current_page,
        per_page: this.paginatorInformations.per_page
      }));
  }

  addCommercialExterne(data: OffreVoyage) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '600px';
    dialogConfig.data = {offreVoyage: data};
    this.dialog.open(DialogAddOffreVoyageLimitedComponent, dialogConfig);
  }

  update(selectedId: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.store.dispatch(new LoadOneOffreVoyageRequest({id: selectedId}));
    this.dialog.open(DialogUpdateOffreVoyageComponent, dialogConfig);
  }
}
