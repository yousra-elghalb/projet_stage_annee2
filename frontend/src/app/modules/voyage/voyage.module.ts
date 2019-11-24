import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {VoyageRoutingModule} from './voyage-routing.module';
import {ListComponent} from './views/list/list.component';
import {MainComponent} from './views/main/main.component';
import {SharedModuleModule} from '../../shared-module/shared-module.module';
import {StoreModule} from '@ngrx/store';
import * as fromVoyage from './store/voyage.reducer';
import {EffectsModule} from '@ngrx/effects';
import {VoyageEffects} from './store/voyage.effects';
import {ListResolverService} from './route-guards/list-resolver.service';
import {SharedVoyageModule} from './shared-voyage.module';
import {UpdateVoyageComponent} from './views/update-voyage/update-voyage.component';
import {AddVoyageComponent} from './views/add-voyage/add-voyage.component';
import {CategorieEffects} from '../categorie/store/categorie.effects';
import {SharedCategorieModule} from '../categorie/shared-categorie.module';
import {AgenceEffects} from '../agence/store/agence.effects';
import {AgenceService} from '../agence/service/agence.service';
import {SharedVilleModule} from '../ville/shared-ville.module';
import {VilleEffects} from '../ville/store/ville.effects';
import {SharedOffreVoyageModule} from '../offre-voyage/shared-offre-voyage.module';
import {OffreVoyageEffects} from '../offre-voyage/store/offre-voyage.effects';
import {PaysEffects} from '../pays/store/pays.effects';
import {SharedAccompagnateurModule} from '../accompagnateur/shared-accompagnateur.module';
import {AccompagnateurEffects} from '../accompagnateur/store/accompagnateur.effects';
import {VoyageResolverService} from './route-guards/voyage-resolver.service';
import {MatStepperModule} from '@angular/material';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {SharedChauffeurModule} from '../chauffeur/shared-chauffeur.module';
import {SharedVehiculeModule} from '../vehicule/shared-vehicule.module';
import {ChauffeurEffects} from '../chauffeur/store/chauffeur.effects';
import {VehiculeEffects} from '../vehicule/store/vehicule.effects';
import {CommercialEffects} from '../commercial/store/commercial.effects';
import {TypeVehiculeEffects} from '../type-vehicule/store/type-vehicule.effects';
import {MarqueVehiculeEffects} from '../marque-vehicule/store/marque-vehicule.effects';
import {SocieteEffects} from '../societe/store/societe.effects';

@NgModule({
  declarations: [
    ListComponent,
    MainComponent,
    UpdateVoyageComponent,
    AddVoyageComponent
  ],
  imports: [
    MatStepperModule,
    CommonModule,
    SharedAccompagnateurModule,
    VoyageRoutingModule,
    StoreModule.forFeature('voyage', fromVoyage.reducer),
    EffectsModule.forFeature([
      VoyageEffects,
      CategorieEffects,
      AgenceEffects,
      VilleEffects,
      PaysEffects,
      OffreVoyageEffects,
      AccompagnateurEffects,
      ChauffeurEffects,
      VehiculeEffects,
      TypeVehiculeEffects,
      MarqueVehiculeEffects,
      SocieteEffects
    ]),
    SharedModuleModule,
    SharedVoyageModule,
    SharedCategorieModule,
    SharedVilleModule,
    SharedOffreVoyageModule,
    DragDropModule,
    SharedChauffeurModule,
    SharedVehiculeModule,
  ],
  providers: [
    ListResolverService,
    // CategorieService,
    VoyageResolverService,
    AgenceService,
  ],
})
export class VoyageModule {
}
