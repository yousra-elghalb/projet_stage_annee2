import {Component, OnDestroy, OnInit} from '@angular/core';
import {Actions, ofType} from '@ngrx/effects';
import {OffreVoyageActionTypes} from '../../store/offre-voyage.actions';
import {map} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material';
import {TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs';
import {VoyageurActionTypes} from '../../../voyageur/store/voyageur.actions';
import {PGroupeActionTypes} from '../../../groupe/pgroupe/store/p-groupe.actions';
import {SGroupeActionTypes} from '../../../groupe/sgroupe/store/s-groupe.actions';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  saveOffreVoyageSuccessSubscription: Subscription;
  updateOffreVoyageSuccessSubscription: Subscription;
  deleteOffreVoyageSuccessSubscription: Subscription;

  saveOffreVoyageFailedSubscription: Subscription;
  updateOffreVoyageFailedSubscription: Subscription;
  deleteOffreVoyageFailedSubscription: Subscription;

  constructor(private snackBar: MatSnackBar,
              private  actions: Actions, private translate: TranslateService) {
    translate.setDefaultLang('fr');
  }

  ngOnInit() {
    this.saveOffreVoyageSuccessSubscription = this.actions.pipe(ofType(
      OffreVoyageActionTypes.SaveOffreVoyageSuccess,
      SGroupeActionTypes.SaveSGroupeSuccess,
      PGroupeActionTypes.SavePGroupeSuccess
      ),
      map(value => {
        this.translate.get('message success add').subscribe(value1 => {
          this.snackBar.open(value1, 'X');
        });
      })
    ).subscribe();
    this.deleteOffreVoyageSuccessSubscription = this.actions.pipe(ofType(
      OffreVoyageActionTypes.DeleteOffreVoyageSuccess,
      ),
      map(value => {
        this.translate.get('message success delete').subscribe(value1 => {
          this.snackBar.open(value1, 'X');
        });
      })
    ).subscribe();
    this.updateOffreVoyageSuccessSubscription = this.actions.pipe(ofType(
      OffreVoyageActionTypes.UpdateOffreVoyageSuccess,
      SGroupeActionTypes.UpdateSGroupeSuccess,
      SGroupeActionTypes.SaveSGroupeFactureSuccess,
      PGroupeActionTypes.UpdatePGroupeSuccess,
      PGroupeActionTypes.SavePGroupeFactureSuccess,
      VoyageurActionTypes.UpdateVoyageurSuccess,
      ),
      map(value => {
        this.translate.get('message success update').subscribe(value1 => {
          this.snackBar.open(value1, 'X');
        });
      })
    ).subscribe();


    this.saveOffreVoyageFailedSubscription = this.actions.pipe(ofType(
      OffreVoyageActionTypes.SaveOffreVoyageFailed,
      SGroupeActionTypes.SaveSGroupeFailed,
      PGroupeActionTypes.SavePGroupeFailed
      ),
      map(value => {
        this.translate.get('message failed add').subscribe(value1 => {
          this.snackBar.open(value1, 'X');
        });
      })
    ).subscribe();
    this.deleteOffreVoyageFailedSubscription = this.actions.pipe(ofType(
      OffreVoyageActionTypes.DeleteOffreVoyageFailed),
      map(value => {
        this.translate.get('message failed delete').subscribe(value1 => {
          this.snackBar.open(value1, 'X');
        });
      })
    ).subscribe();
    this.updateOffreVoyageFailedSubscription = this.actions.pipe(ofType(
      OffreVoyageActionTypes.UpdateOffreVoyageFailed,
      SGroupeActionTypes.UpdateSGroupeFailed,
      SGroupeActionTypes.SaveSGroupeFactureFailed,
      PGroupeActionTypes.UpdatePGroupeFailed,
      PGroupeActionTypes.SavePGroupeFactureFailed,
      VoyageurActionTypes.UpdateVoyageurFailed,
      ),
      map(value => {
        this.translate.get('message failed update').subscribe(value1 => {
          this.snackBar.open(value1, 'X');
        });
      })
    ).subscribe();
  }

  ngOnDestroy(): void {

    this.updateOffreVoyageSuccessSubscription.unsubscribe();
    this.deleteOffreVoyageSuccessSubscription.unsubscribe();
    this.saveOffreVoyageSuccessSubscription.unsubscribe();


    this.updateOffreVoyageFailedSubscription.unsubscribe();
    this.deleteOffreVoyageFailedSubscription.unsubscribe();
    this.saveOffreVoyageFailedSubscription.unsubscribe();
  }

}
