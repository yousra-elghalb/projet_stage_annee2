import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AddGroupeToOffreVoyageComponent} from './views/add-groupe-to-offre-voyage/add-groupe-to-offre-voyage.component';
import {ModalitesResolverService} from '../../modalite/route-guards/modalites-resolver.service';
import {OffreVoyageResolverService} from '../../offre-voyage/route-guards/offre-voyage-resolver.service';
import {OptionsResolverService} from '../../options/route-guards/options-resolver.service';
import {GroupeByOffreVoyageResolverService} from './route-guards/groupe-by-offre-voyage-resolver.service';
import {GroupeByIdResolverService} from './route-guards/groupe-by-id-resolver.service';
import {ListVoyageursSGroupeComponent} from './views/list-voyageurs-groupe/list-voyageurs-groupe.component';
import {UpdateSGroupeOfOffreVoyageComponent} from './views/update-groupe-of-offre-voyage/update-groupe-of-offre-voyage.component';

const routes: Routes = [{
  path: 'add/:offreId',
  component: AddGroupeToOffreVoyageComponent,
  resolve: {
    modalites: ModalitesResolverService,
    offreVoyage: OffreVoyageResolverService,
    options: OptionsResolverService,
  }
}, {
  path: 'list/:offreId',
  component: ListVoyageursSGroupeComponent,
  resolve: {
    groupe: GroupeByOffreVoyageResolverService,
    offreVoyage: OffreVoyageResolverService,
  }
}, {
  path: 'list/:offreId/update/:id',
  component: UpdateSGroupeOfOffreVoyageComponent,
  resolve: {
    modalites: ModalitesResolverService,
    offreVoyage: OffreVoyageResolverService,
    groupe: GroupeByIdResolverService,
    options: OptionsResolverService,
  }
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SGroupeRoutingModule {
}
