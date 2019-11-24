import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-sub-header-search',
  templateUrl: './sub-header-search.component.html',
  styleUrls: ['./sub-header-search.component.scss']
})
export class SubHeaderSearchComponent implements OnInit {

  @Input() totale: number;
  @Input() valueSearch = '';
  @Output() onsearch: EventEmitter<any> = new EventEmitter();
  elementForm: FormGroup;

  onSearch() {
    this.onsearch.emit(this.elementForm.value.search);
  }

  constructor() {
  }

  ngOnInit() {
    this.elementForm = new FormGroup({
      search: new FormControl(this.valueSearch, []),
    });
  }

}
