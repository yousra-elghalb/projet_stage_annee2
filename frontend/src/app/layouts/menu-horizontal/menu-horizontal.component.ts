import {Component, OnInit} from '@angular/core';
import {selectCommercial, selectUserPermissions} from '../../modules/user/store/user.selectors';
import {Store} from '@ngrx/store';
import {UserState} from '../../modules/user/store/user.reducer';
import {UserPermissions} from '../../modules/user/model/user-permissions';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Categorie} from '../../modules/categorie/model/categorie';
import {selectAllCategories} from '../../modules/categorie/store/categorie.selectors';
import {CategorieService} from '../../modules/categorie/service/categorie.service';
import {Commercial} from '../../modules/commercial/model/commercial';

@Component({
  selector: 'app-menu-horizontal',
  templateUrl: './menu-horizontal.component.html',
  styleUrls: ['./menu-horizontal.component.scss']
})
export class MenuHorizontalComponent implements OnInit {

  userPermission: Observable<UserPermissions>;
  categoires: Observable<Categorie[]>;
  commercial: Observable<Commercial>;

  constructor(private store: Store<UserState>, private categorieService: CategorieService) {
  }

  ngOnInit() {
    this.userPermission = this.store.select(selectUserPermissions).pipe(map(value => {
      return value;
    }));
    this.categoires = this.store.select(selectAllCategories);
    this.commercial = this.store.select(selectCommercial);

  }

}
