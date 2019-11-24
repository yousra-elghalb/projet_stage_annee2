import {Component, OnInit} from '@angular/core';
import {
  selectAllGroupeConventions,
  selectFeatureGroupeConventions,
  selectGroupeConventionPaginatorInformations,
  selectGroupeConventionSearch
} from '../../store/groupe-convention.selectors';
import {select, Store} from '@ngrx/store';
import {GroupeConventionState} from '../../store/groupe-convention.reducer';
import {GroupeConvention} from '../../model/groupe-convention';
import {MatDialog, MatDialogConfig, MatTableDataSource} from '@angular/material';
import {PaginatorInformations} from '../../../../shared_models/paginator-informations';
import {
  DeleteGroupeConventionRequest,
  LoadOneGroupeConventionRequest,
  LoadGroupeConventionsRequest, GroupeConventionActionTypes
} from '../../store/groupe-convention.actions';
import {ConfirmComponent} from '../../../../layouts/alerts/confirm/confirm.component';
import {DialogAddGroupeConventionComponent} from '../dialog-add-groupe-convention/dialog-add-groupe-convention.component';
import {DialogUpdateGroupeConventionComponent} from '../dialog-update-groupe-convention/dialog-update-groupe-convention.component';
import {Observable} from 'rxjs';
import {UserPermissions} from '../../../user/model/user-permissions';
import {selectUserPermissions} from '../../../user/store/user.selectors';
import {FormControl, FormGroup} from '@angular/forms';
import {Actions, ofType} from '@ngrx/effects';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  displayedColumns: string[] = ['id',
    'nom',
    'raisonSociale',
    'tel',
    'responsable',
    'ice',
    'adresse',
    'taille',
    'reduction',
    'actions'];
  displayedSocieteColumns: string[] = ['id',
    'nom',
    'raisonSociale',
    'tel',
    'responsable',
    'ice',
    'adresse',
    'taille',
    'reduction',
    'actions'];
  displayedFamilleColumns: string[] = ['id',
    'nom',
    'tel',
    'adresse',
    'reduction',
    'actions'];
  elementFormSerach = new FormGroup({
    type: new FormControl('societe', []),
  });
  dataSource: MatTableDataSource<GroupeConvention>;
  paginatorInformations: PaginatorInformations = {per_page: 15, current_page: 1};
  search: string;
  userPermission: Observable<UserPermissions>;
  fidele: number;

  constructor(private  updates$: Actions,
              private store: Store<GroupeConventionState>, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.userPermission = this.store.select(selectUserPermissions);
    this.store.pipe(select(selectAllGroupeConventions)).subscribe(value => {
      this.dataSource = new MatTableDataSource(value);
    });
    this.updates$.pipe(ofType(
      GroupeConventionActionTypes.LoadGroupeConventionsSuccess), map(value => {
        if (this.elementFormSerach.value.type === 'societe') {
          this.displayedColumns = this.displayedSocieteColumns;
        } else {
          this.displayedColumns = this.displayedFamilleColumns;
        }
      })
    ).subscribe();
    this.store.pipe(select(selectFeatureGroupeConventions)).subscribe(value => {
      this.paginatorInformations = value.paginatorInformations;
      this.search = value.search;
      this.fidele = value.fidele;
    });
  }

  delete(selectedId: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {titre: 'Suppression', body: 'Voulez-vous supprimer ?'};
    dialogConfig.width = '440px';
    this.dialog.open(ConfirmComponent, dialogConfig).afterClosed().subscribe(value => {
      if (value) {
        this.store.dispatch(new DeleteGroupeConventionRequest({id: selectedId}));
      }
    });
  }

  change(paginator) {
    this.store.dispatch(new LoadGroupeConventionsRequest(this.fidele,
      this.search,
      {
        current_page: paginator.pageIndex + 1,
        per_page: paginator.pageSize
      }));
  }

  onSearchValue() {
    this.store.dispatch(new LoadGroupeConventionsRequest(this.elementFormSerach.value.type,
      this.search,
      {
        current_page: this.paginatorInformations.current_page,
        per_page: this.paginatorInformations.per_page
      }));
  }

  onSearch($event: any) {
    this.store.dispatch(new LoadGroupeConventionsRequest(this.elementFormSerach.value.type,
      $event,
      {
        current_page: this.paginatorInformations.current_page,
        per_page: this.paginatorInformations.per_page
      }));
  }

  newElement() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.dialog.open(DialogAddGroupeConventionComponent, dialogConfig);
  }

  update(selectedId: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.store.dispatch(new LoadOneGroupeConventionRequest({id: selectedId}));
    this.dialog.open(DialogUpdateGroupeConventionComponent, dialogConfig);
  }


}
