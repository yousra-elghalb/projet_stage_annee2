import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {AbstractControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material';
import {Store} from '@ngrx/store';
import {SousCategorieState} from '../../store/sous-categorie.reducer';
import {map, startWith} from 'rxjs/operators';
import {selectAllSousCategories, selectedChipsSousCategories} from '../../store/sous-categorie.selectors';
import {AddChipsSousCategories, RemoveChipsSousCategories} from '../../store/sous-categorie.actions';

@Component({
  selector: 'app-chips-sous-categories',
  templateUrl: './chips-sous-categories.component.html',
  styleUrls: ['./chips-sous-categories.component.scss']
})
export class ChipsSousCategoriesComponent implements OnInit {

  separatorKeysCodes: number[] = [ENTER, COMMA];
  @Input() dataCtrl: AbstractControl;
  filteredDatas: Observable<any[]>;
  selectedData: any[];
  allData: any[];

  @ViewChild('dataInput', {static: false}) dataInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;


  constructor(private sousCategorie: Store<SousCategorieState>) {

  }

  ngOnInit(): void {
    this.filteredDatas = this.dataCtrl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)));
    this.sousCategorie.select(selectAllSousCategories).subscribe(value => {
      this.allData = value;
    });
    this.sousCategorie.select(selectedChipsSousCategories).subscribe(value => {
      this.selectedData = value;
    });
  }

  remove(data: any): void {
    console.warn(data);
    this.sousCategorie.dispatch(new RemoveChipsSousCategories({id: data.id}));
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.sousCategorie.dispatch(new AddChipsSousCategories({sousCategorie: event.option.value}));
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
