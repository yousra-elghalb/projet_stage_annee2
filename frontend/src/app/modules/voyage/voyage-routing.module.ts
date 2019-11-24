import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from './views/main/main.component';
import {ListComponent} from './views/list/list.component';
import {ListResolverService} from './route-guards/list-resolver.service';
import {AddVoyageComponent} from './views/add-voyage/add-voyage.component';
import {AccompagnateursResolverService} from '../accompagnateur/route-guards/accompagnateurs-resolver.service';
import {CategoriesResolverService} from '../categorie/route-guards/categories-resolver.service';
import {SousCategoriesResolverService} from '../sous-categorie/route-guards/sous-categories-resolver.service';
import {AgencesResolverService} from '../agence/route-guards/agences-resolver.service';
import {VillesResolverService} from '../ville/route-guards/villes-resolver.service';
import {PaysResolverService} from '../pays/route-guards/pays-resolver.service';
import {UpdateVoyageComponent} from './views/update-voyage/update-voyage.component';
import {VoyageResolverService} from './route-guards/voyage-resolver.service';


const routes: Routes = [{
  path: '',
  component: MainComponent,
  children: [{
    path: 'list',
    component: ListComponent,
    resolve: {
      categories: ListResolverService
    }
  }, {
    path: 'addvoyage',
    component: AddVoyageComponent,
    resolve: {
      categories: CategoriesResolverService,
      agences: AgencesResolverService,
      villes: VillesResolverService,
      pays: PaysResolverService,
      sousCategories: SousCategoriesResolverService,
      accompagnateurs: AccompagnateursResolverService
    }
  }, {
    path: 'update/:id',
    component: UpdateVoyageComponent,
    resolve: {
      voyage: VoyageResolverService,
      categories: CategoriesResolverService,
      villes: VillesResolverService,
      pays: PaysResolverService,
      sousCategories: SousCategoriesResolverService,
    }
  }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VoyageRoutingModule {
}
