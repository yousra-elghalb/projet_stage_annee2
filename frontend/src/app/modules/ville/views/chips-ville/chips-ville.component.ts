import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {AbstractControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material';
import {Store} from '@ngrx/store';
import {VilleState} from '../../store/ville.reducer';
import {map, startWith} from 'rxjs/operators';
import {selectAllVilles, selectedChipsVilles} from '../../store/ville.selectors';
import {AddChipsVilles, RemoveChipsVilles} from '../../store/ville.actions';

@Component({
  selector: 'app-chips-ville',
  templateUrl: './chips-ville.component.html',
  styleUrls: ['./chips-ville.component.scss']
})
export class ChipsVilleComponent implements OnInit {

  separatorKeysCodes: number[] = [ENTER, COMMA];
  @Input() dataCtrl: AbstractControl;
  filteredDatas: Observable<any[]>;
  selectedData: any[];
  allData: any[];

  @ViewChild('dataInput', {static: false}) dataInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;


  constructor(private ville: Store<VilleState>) {

  }

  ngOnInit(): void {
    this.filteredDatas = this.dataCtrl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)));
    this.ville.select(selectAllVilles).subscribe(value => {
      this.allData = value;
    });
    this.ville.select(selectedChipsVilles).subscribe(value => {
      this.selectedData = value;
    });
  }

  remove(data: any): void {
    console.warn(data);
    this.ville.dispatch(new RemoveChipsVilles({id: data.id}));
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.ville.dispatch(new AddChipsVilles({ville: event.option.value}));
    this.dataInput.nativeElement.value = '';
    this.dataCtrl.setValue(null);
  }

  private _filter(value: any): any[] {
    try {
      const filterValue = value.toLowerCase();
      return this.allData.filter(option => option.nom.toLowerCase().includes(filterValue));
    } catch (e) {
    }
    return this.allData.filter(option => option.nom.toLowerCase().includes(''));
  }
}
