import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {MatDialog, MatDialogConfig, MatTableDataSource} from '@angular/material';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {SGroupe} from '../../model/s-groupe';
import {UserPermissions} from '../../../../user/model/user-permissions';
import {OffreVoyage} from '../../../../offre-voyage/model/offre-voyage';
import {OffreVoyageService} from '../../../../offre-voyage/service/offre-voyage.service';
import {OffreVoyageState} from '../../../../offre-voyage/store/offre-voyage.reducer';
import {selectCommercial, selectUserPermissions} from '../../../../user/store/user.selectors';
import {selectFeatureSGroupes} from '../../store/s-groupe.selectors';
import {ListVoyageurSgroupeNationalComponent} from '../print/list-voyageur-sgroupe-national/list-voyageur-sgroupe-national.component';
import {ListVoyageurSgroupeInternationalComponent} from '../print/list-voyageur-sgroupe-international/list-voyageur-sgroupe-international.component';
import {FactureSGroupeComponent} from '../print/facture-s-groupe/facture-s-groupe.component';
import {DialogUpdateFactureComponent} from '../dialog-update-facture/dialog-update-facture.component';
import {Commercial} from '../../../../commercial/model/commercial';
import {map} from 'rxjs/operators';
import {BreakpointObserver} from '@angular/cdk/layout';
import {ListOperationsPaiementComponent} from '../list-operations-paiement/list-operations-paiement.component';

@Component({
  selector: 'app-list-voyageurs-groupe',
  templateUrl: './list-voyageurs-groupe.component.html',
  styleUrls: ['./list-voyageurs-groupe.component.scss']
})
export class ListVoyageursSGroupeComponent implements OnInit {

  displayedColumns: string[] = ['id',
    'cin',
    'nom',
    'tel',
    'DatePaiement',
    'ModePaiement',
    'montantpaye',
    'totale',
    'reduction',
    'restpaye',
    'etat',
    'relation',
    'ville',
    'commercial'];
  dataSource: MatTableDataSource<SGroupe>;
  search: string;
  userPermission: Observable<UserPermissions>;
  serach: any;
  offreVoyage: OffreVoyage;
  elementFormSerach = new FormGroup({
    etat: new FormControl('', []),
    type: new FormControl('', []),
    ville: new FormControl('', []),
  });
  catId: string;
  groupe: SGroupe;
  commercial: Observable<Commercial>;
  isSmall$: Observable<boolean> = this.breakpointObserver.observe('(max-width: 800px)')
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, private store: Store<OffreVoyageState>,
              private offreVoyageService: OffreVoyageService,
              private dialog: MatDialog,
              private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.commercial = this.store.select(selectCommercial);

    this.userPermission = this.store.select(selectUserPermissions);
    this.route.paramMap.subscribe(value => {
      this.catId = value.get('catId');
    });
    this.store.select(selectFeatureSGroupes).subscribe(value => {
      this.groupe = value.sGroupe;
      this.dataSource = new MatTableDataSource(new Array(this.groupe));
    });
    this.route.data.subscribe(value => {
      this.offreVoyage = value.offreVoyage as OffreVoyage;
    });
  }

  onSearch($event: any) {

  }

  printListVoyageurSGroupe() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '900px';
    dialogConfig.height = '90vh';
    dialogConfig.data = {offreVoyage: this.offreVoyage, sGroupe: this.groupe};
    if (this.offreVoyage.voyage.categorie.nom.toLowerCase() === 'international') {
      this.dialog.open(ListVoyageurSgroupeInternationalComponent, dialogConfig);
    } else {
      this.dialog.open(ListVoyageurSgroupeNationalComponent, dialogConfig);
    }
  }



  ListOperationsPaiement(element: SGroupe) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '700px';
    dialogConfig.data = {offreVoyage: this.offreVoyage, sGroupe: element};
    this.dialog.open(ListOperationsPaiementComponent, dialogConfig);
  }

}
