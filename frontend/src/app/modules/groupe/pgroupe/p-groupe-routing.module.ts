import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AddVoyageurToOffreVoyageComponent} from './views/add-voyageur-to-offre-voyage/add-voyageur-to-offre-voyage.component';
import {ModalitesResolverService} from '../../modalite/route-guards/modalites-resolver.service';
import {OffreVoyageResolverService} from '../../offre-voyage/route-guards/offre-voyage-resolver.service';
import {OptionsResolverService} from '../../options/route-guards/options-resolver.service';
import {ListVoyageursComponent} from './views/list-voyageur/list-voyageurs.component';
import {UpdateVoyageursOfOffreVoyageComponent} from './views/update-voyageurs-of-offre-voyage/update-voyageurs-of-offre-voyage.component';
import {PGroupeResolverService} from './route-guards/p-groupe-resolver.service';
import {PGroupesResolverService} from './route-guards/p-groupes-resolver.service';


const routes: Routes = [
  {
    path: 'add/:offreId',
    component: AddVoyageurToOffreVoyageComponent,
    resolve: {
      modalites: ModalitesResolverService,
      offreVoyage: OffreVoyageResolverService,
      options: OptionsResolverService,
    }
  }, {
    path: 'list/:offreId',
    component: ListVoyageursComponent,
    resolve: {
      voyageurs: PGroupesResolverService,
      offreVoyage: OffreVoyageResolverService,
      modalites: ModalitesResolverService,
    },
  }, {
    path: 'list/:offreId/update/:id',
    component: UpdateVoyageursOfOffreVoyageComponent,
    resolve: {
      modalites: ModalitesResolverService,
      offreVoyage: OffreVoyageResolverService,
      groupe: PGroupeResolverService,
      options: OptionsResolverService,
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PGroupeRoutingModule {
}
