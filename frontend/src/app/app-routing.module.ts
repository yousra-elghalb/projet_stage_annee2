import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IndexComponent} from './layouts/index/index.component';
import {DashboardComponent} from './modules/dashboard/dashboard.component';
import {LoginComponent} from './modules/user/views/login/login.component';
import {IsAuthenticatedService} from './modules/user/route-guards/is-authenticated.service';
import {IsNotAuthenticatedService} from './modules/user/route-guards/is-not-authenticated.service';
import {IsAllowedToReadModaliteService} from './modules/modalite/route-guards/is-allowed-to-read-modalite.service';
import {IsAllowedToReadCategorieService} from './modules/categorie/route-guards/is-allowed-to-read-commercial.service';
import {IsAllowedToReadSousCategorieService} from './modules/sous-categorie/route-guards/is-allowed-to-read-sous-categorie.service';
import {IsAllowedToReadPaysService} from './modules/pays/route-guards/is-allowed-to-read-pays.service';
import {IsAllowedToReadVilleService} from './modules/ville/route-guards/is-allowed-to-read-ville.service';
import {IsAllowedToReadAccompagnateurService} from './modules/accompagnateur/route-guards/is-allowed-to-read-accompagnateur.service';
import {IsAllowedToReadCommercialService} from './modules/commercial/route-guards/is-allowed-to-read-commercial.service';
import {IsAllowedToReadRoleService} from './modules/role/route-guards/is-allowed-to-read-role.service';
import {IsAllowedToReadAgenceService} from './modules/agence/route-guards/is-allowed-to-read-agence.service';
import {IsAllowedToReadVoyageService} from './modules/voyage/route-guards/is-allowed-to-read-voyage.service';
import {IsAllowedToReadOffreVoyageService} from './modules/offre-voyage/route-guards/is-allowed-to-read-offre-voyage.service';
import {IsAllowedToReadVoyageurService} from './modules/voyageur/route-guards/is-allowed-to-read-voyageur.service';
import {IsAllowedToReadOptionService} from './modules/options/route-guards/is-allowed-to-read-option.service';
import {Error404Component} from './layouts/error404/error404.component';
import {CategoriesResolverService} from './modules/categorie/route-guards/categories-resolver.service';
import {IsAllowedToReadDepenseService} from './modules/depense/route-guards/is-allowed-to-read-depense.service';
import {IsAllowedToReadChauffeurService} from './modules/chauffeur/route-guards/is-allowed-to-read-chauffeur.service';
import {IsAllowedToReadSocieteService} from './modules/societe/route-guards/is-allowed-to-read-societe.service';
import {IsAllowedToReadTypeVehiculeService} from './modules/type-vehicule/route-guards/is-allowed-to-read-type-vehicule.service';
import {IsAllowedToReadVehiculeService} from './modules/vehicule/route-guards/is-allowed-to-read-vehicule.service';
import {IsAllowedToReadMarqueVehiculeService} from './modules/marque-vehicule/route-guards/is-allowed-to-read-marque-vehicule.service';
import {IsAllowedToReadHotelService} from './modules/hotel/route-guards/is-allowed-to-read-hotel.service';
import {IsAllowedToReadGroupeConventionService} from './modules/groupe-convention/route-guards/is-allowed-to-read-groupe-convention.service';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [IsNotAuthenticatedService],
  }, {
    path: '',
    component: IndexComponent,
    canActivateChild: [IsAuthenticatedService],
    canActivate: [IsAuthenticatedService],
    resolve: {categories: CategoriesResolverService},
    children: [{
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full'
    }, {
      path: 'dashboard',
      component: DashboardComponent
    }, {
      path: 'role',
      canActivate: [IsAllowedToReadRoleService],
      canActivateChild: [IsAllowedToReadRoleService],
      loadChildren: () => import('./modules/role/role.module').then(mod => mod.RoleModule),
    }, {
      path: 'modalite',
      canActivate: [IsAllowedToReadModaliteService],
      canActivateChild: [IsAllowedToReadModaliteService],
      loadChildren: () => import('./modules/modalite/modalite.module').then(mod => mod.ModaliteModule),
    }, {
      path: 'categorie',
      canActivate: [IsAllowedToReadCategorieService],
      canActivateChild: [IsAllowedToReadCategorieService],
      loadChildren: () => import('./modules/categorie/categorie.module').then(mod => mod.CategorieModule),
    }, {
      path: 'sousCategorie',
      canActivate: [IsAllowedToReadSousCategorieService],
      canActivateChild: [IsAllowedToReadSousCategorieService],
      loadChildren: () => import('./modules/sous-categorie/sous-categorie.module').then(mod => mod.SousCategorieModule),
    }, {
      path: 'pays',
      canActivate: [IsAllowedToReadPaysService],
      canActivateChild: [IsAllowedToReadPaysService],
      loadChildren: () => import('./modules/pays/pays.module').then(mod => mod.PaysModule),
    }, {
      path: 'ville',
      canActivate: [IsAllowedToReadVilleService],
      canActivateChild: [IsAllowedToReadVilleService],
      loadChildren: () => import('./modules/ville/ville.module').then(mod => mod.VilleModule),
    }, {
      path: 'agence',
      canActivate: [IsAllowedToReadAgenceService],
      canActivateChild: [IsAllowedToReadAgenceService],
      loadChildren: () => import('./modules/agence/agence.module').then(mod => mod.AgenceModule),
    }, {
      path: 'accompagnateur',
      canActivate: [IsAllowedToReadAccompagnateurService],
      canActivateChild: [IsAllowedToReadAccompagnateurService],
      loadChildren: () => import('./modules/accompagnateur/accompagnateur.module').then(mod => mod.AccompagnateurModule),
    }, {
      path: 'chauffeur',
      canActivate: [IsAllowedToReadChauffeurService],
      canActivateChild: [IsAllowedToReadChauffeurService],
      loadChildren: () => import('./modules/chauffeur/chauffeur.module').then(mod => mod.ChauffeurModule),
    }, {
      path: 'commercial',
      canActivate: [IsAllowedToReadCommercialService],
      canActivateChild: [IsAllowedToReadCommercialService],
      loadChildren: () => import('./modules/commercial/commercial.module').then(mod => mod.CommercialModule),
    }, {
      path: 'voyage',
      canActivate: [IsAllowedToReadVoyageService],
      canActivateChild: [IsAllowedToReadVoyageService],
      loadChildren: () => import('./modules/voyage/voyage.module').then(mod => mod.VoyageModule),
    }, {
      path: 'voyageur',
      canActivate: [IsAllowedToReadVoyageurService],
      canActivateChild: [IsAllowedToReadVoyageurService],
      loadChildren: () => import('./modules/voyageur/voyageur.module').then(mod => mod.VoyageurModule),
    }, {
      path: 'offreVoyage',
      canActivate: [IsAllowedToReadOffreVoyageService],
      canActivateChild: [IsAllowedToReadOffreVoyageService],
      loadChildren: () => import('./modules/offre-voyage/offre-voyage.module').then(mod => mod.OffreVoyageModule),
    }, {
      path: 'option',
      canActivate: [IsAllowedToReadOptionService],
      canActivateChild: [IsAllowedToReadOptionService],
      loadChildren: () => import('./modules/options/option.module').then(mod => mod.OptionModule),
    }, {
      path: 'depense',
      canActivate: [IsAllowedToReadDepenseService],
      canActivateChild: [IsAllowedToReadDepenseService],
      loadChildren: () => import('./modules/depense/depense.module').then(mod => mod.DepenseModule),
    }, {
      path: 'societe',
      canActivate: [IsAllowedToReadSocieteService],
      canActivateChild: [IsAllowedToReadSocieteService],
      loadChildren: () => import('./modules/societe/societe.module').then(mod => mod.SocieteModule),
    }, {
      path: 'typeVehicule',
      canActivate: [IsAllowedToReadTypeVehiculeService],
      canActivateChild: [IsAllowedToReadTypeVehiculeService],
      loadChildren: () => import('./modules/type-vehicule/type-vehicule.module').then(mod => mod.TypeVehiculeModule),
    }, {
      path: 'marqueVehicule',
      canActivate: [IsAllowedToReadMarqueVehiculeService],
      canActivateChild: [IsAllowedToReadMarqueVehiculeService],
      loadChildren: () => import('./modules/marque-vehicule/marque-vehicule.module').then(mod => mod.MarqueVehiculeModule),
    }, {
      path: 'vehicule',
      canActivate: [IsAllowedToReadVehiculeService],
      canActivateChild: [IsAllowedToReadVehiculeService],
      loadChildren: () => import('./modules/vehicule/vehicule.module').then(mod => mod.VehiculeModule),
    }, {
      path: 'groupeConvention',
      canActivate: [IsAllowedToReadGroupeConventionService],
      canActivateChild: [IsAllowedToReadGroupeConventionService],
      loadChildren: () => import('./modules/groupe-convention/groupe-convention.module').then(mod => mod.GroupeConventionModule),
    }, {
      path: 'hotel',
      canActivate: [IsAllowedToReadHotelService],
      canActivateChild: [IsAllowedToReadHotelService],
      loadChildren: () => import('./modules/hotel/hotel.module').then(mod => mod.HotelModule),
    }
    ]
  },
  {
    path: '**',
    component: Error404Component
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
