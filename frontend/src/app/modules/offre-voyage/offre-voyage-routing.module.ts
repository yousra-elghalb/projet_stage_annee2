import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListComponent} from './views/list/list.component';
import {ListResolverService} from './route-guards/list-resolver.service';
import {MainComponent} from './views/main/main.component';
import {ListOffreVoyageLimitedResolverService} from './route-guards/list-offre-voyage-limited-resolver.service';
// tslint:disable-next-line:max-line-length
import {ListOffreVoyageByCommercialExterneComponent} from './views/list-offre-voyage-by-commercial-externe/list-offre-voyage-by-commercial-externe.component';


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'list/:catId/pgroupe',
        // canActivate: [IsAllowedToReadAccompagnateurService],
        // canActivateChild: [IsAllowedToReadAccompagnateurService],
        loadChildren: () => import('../groupe/pgroupe/p-groupe.module').then(mod => mod.PGroupeModule),
      }, {
        path: 'list/:catId/sgroupe',
        // canActivate: [IsAllowedToReadAccompagnateurService],
        // canActivateChild: [IsAllowedToReadAccompagnateurService],
        loadChildren: () => import('../groupe/sgroupe/s-groupe.module').then(mod => mod.SGroupeModule),
      },
      {
        path: 'list/:catId',
        component: ListComponent,
        resolve: {
          categories: ListResolverService
        }
      }, {
        path: 'listOffreVoyageByCommercialExterne/:id',
        component: ListOffreVoyageByCommercialExterneComponent,
        resolve: {
          categories: ListOffreVoyageLimitedResolverService
        }
      },
      /*{
   path: 'calendar',
   component: CalendarComponent
 },*/
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OffreVoyageRoutingModule {
}
