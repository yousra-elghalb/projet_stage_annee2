import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-error-form',
  templateUrl: './error-form.component.html',
  styleUrls: ['./error-form.component.scss']
})
export class ErrorFormComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() field: string;

  constructor() {
  }

  ngOnInit() {
  }

}
