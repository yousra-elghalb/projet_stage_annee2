import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {Actions, ofType} from '@ngrx/effects';
import {map} from 'rxjs/operators';
import {AccompagnateurActionTypes} from '../../store/accompagnateur.actions';
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
      AccompagnateurActionTypes.SaveAccompagnateurSuccess),
      map(value => {
        this.translate.get('message success add').subscribe(value1 => {
          this.snackBar.open(value1, 'X');
        });
      })
    ).subscribe();
    this.deleteSuccessSubscription = this.actions.pipe(ofType(
      AccompagnateurActionTypes.DeleteAccompagnateurSuccess),
      map(value => {
        this.translate.get('message success delete').subscribe(value1 => {
          this.snackBar.open(value1, 'X');
        });
      })
    ).subscribe();
    this.updateSuccessSubscription = this.actions.pipe(ofType(
      AccompagnateurActionTypes.UpdateAccompagnateurSuccess),
      map(value => {
        this.translate.get('message success update').subscribe(value1 => {
          this.snackBar.open(value1, 'X');
        });
      })
    ).subscribe();


    this.saveFailedSubscription = this.actions.pipe(ofType(
      AccompagnateurActionTypes.SaveAccompagnateurFailed),
      map(value => {
        this.translate.get('message failed add').subscribe(value1 => {
          this.snackBar.open(value1, 'X');
        });
      })
    ).subscribe();
    this.deleteFailedSubscription = this.actions.pipe(ofType(
      AccompagnateurActionTypes.DeleteAccompagnateurFailed),
      map(value => {
        this.translate.get('message failed delete').subscribe(value1 => {
          this.snackBar.open(value1, 'X');
        });
      })
    ).subscribe();
    this.updateFailedSubscription = this.actions.pipe(ofType(
      AccompagnateurActionTypes.UpdateAccompagnateurFailed),
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
