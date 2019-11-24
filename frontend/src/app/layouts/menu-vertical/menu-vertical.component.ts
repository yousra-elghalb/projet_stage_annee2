import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {UserPermissions} from '../../modules/user/model/user-permissions';
import {Store} from '@ngrx/store';
import {UserState} from '../../modules/user/store/user.reducer';
import {selectCommercial, selectUserPermissions} from '../../modules/user/store/user.selectors';
import {map} from 'rxjs/operators';
import {selectAllCategories} from '../../modules/categorie/store/categorie.selectors';
import {Commercial} from '../../modules/commercial/model/commercial';
import {Categorie} from '../../modules/categorie/model/categorie';

@Component({
  selector: 'app-menu-vertical',
  templateUrl: './menu-vertical.component.html',
  styleUrls: ['./menu-vertical.component.scss']
})
export class MenuVerticalComponent implements OnInit {
  panelOpenState = false;

  userPermission: Observable<UserPermissions>;
  commercial: Observable<Commercial>;
  categoires: Observable<Categorie[]>;

  constructor(private store: Store<UserState>) {
  }

  ngOnInit() {
    this.userPermission = this.store.select(selectUserPermissions).pipe(map(value => {
      return value;
    }));

    this.categoires = this.store.select(selectAllCategories);
    this.commercial = this.store.select(selectCommercial);

  }

}
