import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {UserState} from '../../store/user.reducer';
import {LoginRequest} from '../../store/user.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  elementForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private store: Store<UserState>) {
  }

  ngOnInit() {
  }

  login() {
    this.store.dispatch(new LoginRequest({user: this.elementForm.value}));
  }
}
