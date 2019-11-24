import {Component, OnDestroy, OnInit} from '@angular/core';
import {Actions, ofType} from '@ngrx/effects';
import {GroupeConventionActionTypes} from '../../store/groupe-convention.actions';
import {map} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material';
import {TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  saveSuccessSubscription: Subscription;
  updateSuccessSubscription: Subscription;
  deleteSuccessSubscription: Subscription;

  saveFailedSubscription: Subscription;
  updateFailedSubscription: Subscription;
  deleteFailedSubscription: Subscription;

  constructor(private snackBar: MatSnackBar,
              private  actions: Actions, private translate: TranslateService) {
    translate.setDefaultLang('fr');
  }

  ngOnInit() {
    this.saveSuccessSubscription = this.actions.pipe(ofType(
      GroupeConventionActionTypes.SaveGroupeConventionSuccess),
      map(value => {
        this.translate.get('message success add').subscribe(value1 => {
          this.snackBar.open(value1, 'X');
        });
      })
    ).subscribe();
    this.deleteSuccessSubscription = this.actions.pipe(ofType(
      GroupeConventionActionTypes.DeleteGroupeConventionSuccess),
      map(value => {
        this.translate.get('message success delete').subscribe(value1 => {
          this.snackBar.open(value1, 'X');
        });
      })
    ).subscribe();
    this.updateSuccessSubscription = this.actions.pipe(ofType(
      GroupeConventionActionTypes.UpdateGroupeConventionSuccess),
      map(value => {
        this.translate.get('message success update').subscribe(value1 => {
          this.snackBar.open(value1, 'X');
        });
      })
    ).subscribe();


    this.saveFailedSubscription = this.actions.pipe(ofType(
      GroupeConventionActionTypes.SaveGroupeConventionFailed),
      map(value => {
        this.translate.get('message failed add').subscribe(value1 => {
          this.snackBar.open(value1, 'X');
        });
      })
    ).subscribe();
    this.deleteFailedSubscription = this.actions.pipe(ofType(
      GroupeConventionActionTypes.DeleteGroupeConventionFailed),
      map(value => {
        this.translate.get('message failed delete').subscribe(value1 => {
          this.snackBar.open(value1, 'X');
        });
      })
    ).subscribe();
    this.updateFailedSubscription = this.actions.pipe(ofType(
      GroupeConventionActionTypes.UpdateGroupeConventionFailed),
      map(value => {
        this.translate.get('message failed update').subscribe(value1 => {
          this.snackBar.open(value1, 'X');
        });
      })
    ).subscribe();
  }

  ngOnDestroy(): void {

    this.updateSuccessSubscription.unsubscribe();
    this.deleteSuccessSubscription.unsubscribe();
    this.saveSuccessSubscription.unsubscribe();


    this.updateFailedSubscription.unsubscribe();
    this.deleteFailedSubscription.unsubscribe();
    this.saveFailedSubscription.unsubscribe();
  }

}
