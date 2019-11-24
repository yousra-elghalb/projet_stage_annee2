import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {MatDialog, MatDialogConfig, MatTableDataSource} from '@angular/material';
import {PaginatorInformations} from '../../../../../shared_models/paginator-informations';
import {Observable, of} from 'rxjs';
import {UserPermissions} from '../../../../user/model/user-permissions';
import {selectCommercial, selectUserPermissions} from '../../../../user/store/user.selectors';
import {OffreVoyageState} from '../../../../offre-voyage/store/offre-voyage.reducer';
import {OffreVoyage} from '../../../../offre-voyage/model/offre-voyage';
import {ActivatedRoute} from '@angular/router';
import {OffreVoyageService} from '../../../../offre-voyage/service/offre-voyage.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Commercial} from '../../../../commercial/model/commercial';
import {selectAllPGroupes, selectPGroupePaginatorInformations, selectPGroupeSearch} from '../../store/p-groupe.selectors';
import {PGroupe} from '../../model/p-groupe';
import {DeletePGroupeRequest, LoadPGroupesRequest} from '../../store/p-groupe.actions';
import {ConfirmComponent} from '../../../../../layouts/alerts/confirm/confirm.component';
import {ListVoyageurPgroupeNationalComponent} from '../print/list-voyageur-pgroupe-national/list-voyageur-pgroupe-national.component';
// tslint:disable-next-line:max-line-length
import {ListVoyageurPgroupeInternationalComponent} from '../print/list-voyageur-pgroupe-international/list-voyageur-pgroupe-international.component';
import {map, takeLast, tap} from 'rxjs/operators';
import {BreakpointObserver} from '@angular/cdk/layout';
import {AllFacturePGroupeComponent} from '../print/all-facture-p-groupe/all-facture-p-groupe.component';
import {SelectionModel} from '@angular/cdk/collections';
import {selectAllModalites} from '../../../../modalite/store/modalite.selectors';
import {Modalite} from '../../../../modalite/model/modalite';
import {ListOperationsPaiementComponent} from '../list-operations-paiement/list-operations-paiement.component';
import {ExcelService} from '../../../../../root-services/excel.service';

@Component({
  selector: 'app-list-voyageurs',
  templateUrl: './list-voyageurs.component.html',
  styleUrls: ['./list-voyageurs.component.scss']
})
export class ListVoyageursComponent implements OnInit {

  displayedColumns: string[] = ['select', 'id',
    'cin',
    'nom',
    'tel',
    'DatePaiement',
    'ModePaiement',
    'montantpaye',
    'facture',
    'totale',
    'reduction',
    'restpaye',
    'etat',
    'relation',
    'ville',
    'commercial',
    'actions'];
  dataSource: MatTableDataSource<PGroupe>;
  paginatorInformations: PaginatorInformations = {per_page: 15, current_page: 1};
  selection = new SelectionModel<PGroupe>(true, []);
  search: { search: string; ville?: string; etat?: string; type?: string };
  userPermission: Observable<UserPermissions>;
  serach: any;
  offreVoyage: OffreVoyage;
  elementFormSerach = new FormGroup({
    etat: new FormControl('', []),
    type: new FormControl('', []),
    ville: new FormControl('', []),
    modalites: new FormControl('', []),
  });
  catId: string;
  commercial: Observable<Commercial>;
  pGroupes: PGroupe[];
  isSmall$: Observable<boolean> = this.breakpointObserver.observe('(max-width: 800px)')
    .pipe(
      map(result => result.matches)
    );
  modalites: Observable<Modalite[]>;

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PGroupe): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store<OffreVoyageState>,
    private offreVoyageService: OffreVoyageService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private excelService: ExcelService,
  ) {
  }

  ngOnInit() {
    this.userPermission = this.store.select(selectUserPermissions);
    this.commercial = this.store.select(selectCommercial);
    this.modalites = this.store.select(selectAllModalites);
    this.route.paramMap.subscribe(value => {
      this.catId = value.get('catId');
    });
    this.store.select(selectAllPGroupes).subscribe(value => {
      this.dataSource = new MatTableDataSource(value);
      this.pGroupes = value;
      this.selection.clear();
    });
    this.store.select(selectPGroupePaginatorInformations).subscribe(value => {
      this.paginatorInformations = value;
    });
    this.store.select(selectPGroupeSearch).subscribe(value => {
      this.search = value;
      this.elementFormSerach.patchValue({...value});
    });
    this.route.data.subscribe(value => {
      this.offreVoyage = value.offreVoyage as OffreVoyage;
    });
  }

  onSearch($event: any) {
    this.serach = $event;
    this.route.paramMap.subscribe(value => {
      this.store.dispatch(new LoadPGroupesRequest(value.get('offreId'), this.paginatorInformations, {...this.search, search: $event}));
    });
  }

  change(paginator) {
    this.route.paramMap.subscribe(value => {
      this.store.dispatch(new LoadPGroupesRequest(value.get('offreId'), {
        per_page: paginator.pageSize,
        current_page: paginator.pageIndex
      }, this.search));
    });
  }

  onSearchValue() {
    this.route.paramMap.subscribe(value => {
      this.store.dispatch(new LoadPGroupesRequest(value.get('offreId'), this.paginatorInformations,
        {...this.elementFormSerach.value, search: this.search.search}));
    });
  }

  delete(vid: number) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {titre: 'Suppression', body: 'Voulez-vous supprimer ?'};
    dialogConfig.width = '440px';
    this.dialog.open(ConfirmComponent, dialogConfig).afterClosed().subscribe(value => {
      if (value) {
        this.store.dispatch(new DeletePGroupeRequest({id: vid}));
      }
    });
  }

  printListVoyageurPGroupe() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '900px';
    dialogConfig.height = '90vh';
    dialogConfig.data = {offreVoyage: this.offreVoyage, pGroupes: this.pGroupes};
    if (this.offreVoyage.voyage.categorie.nom.toLowerCase() === 'international') {
      this.dialog.open(ListVoyageurPgroupeInternationalComponent, dialogConfig);
    } else {
      this.dialog.open(ListVoyageurPgroupeNationalComponent, dialogConfig);
    }
  }


  printFactures() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '900px';
    dialogConfig.height = '90vh';
    console.warn(this.selection.selected);
    dialogConfig.data = {
      offreVoyage: this.offreVoyage,
      pGroupe: this.selection.selected,
      modalites: this.elementFormSerach.value.modalites
    };
    this.dialog.open(AllFacturePGroupeComponent, dialogConfig);
  }

  ListOperationsPaiement(element: PGroupe) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '700px';
    dialogConfig.data = {offreVoyage: this.offreVoyage, pGroupe: element};
    this.dialog.open(ListOperationsPaiementComponent, dialogConfig);
  }

  printListExcelVoyageurPGroupe() {
    const voyageurs = [];
    of(...this.pGroupes).pipe(map((value) => {
        return {
          voyayeurs: value.voyageurs.map(value1 => (
            {
              id: value1.id,
              cin: value1.cin,
              'Nom & Prenom': value1.nom + ' ' + value1.prenom,
              ville: value.ville.nom
            }
          ))
        };
      }),
      tap(x => voyageurs.push(...x.voyayeurs)),
      takeLast(1)).subscribe((value: any) => {
      // console.warn(voyageurs);
      this.excelService.exportAsExcelFile(voyageurs, 'sample');
    });
  }
}
