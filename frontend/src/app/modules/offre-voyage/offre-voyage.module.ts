import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {StoreModule} from '@ngrx/store';
import * as fromOffreVoyage from './store/offre-voyage.reducer';
import {EffectsModule} from '@ngrx/effects';
import {OffreVoyageEffects} from './store/offre-voyage.effects';
import {ListComponent} from './views/list/list.component';
import {ListResolverService} from './route-guards/list-resolver.service';
import {SharedModuleModule} from '../../shared-module/shared-module.module';
import {SharedOffreVoyageModule} from './shared-offre-voyage.module';
import {OffreVoyageRoutingModule} from './offre-voyage-routing.module';
import {MainComponent} from './views/main/main.component';
import {AgenceEffects} from '../agence/store/agence.effects';
// tslint:disable-next-line:max-line-length
import {AddVoyageurToOffreVoyageComponent} from '../groupe/pgroupe/views/add-voyageur-to-offre-voyage/add-voyageur-to-offre-voyage.component';
import {SharedModaliteModule} from '../modalite/shared-modalite.module';
import {ModaliteEffects} from '../modalite/store/modalite.effects';
import {OffreVoyageResolverService} from './route-guards/offre-voyage-resolver.service';
import {SharedAccompagnateurModule} from '../accompagnateur/shared-accompagnateur.module';
import {OptionEffects} from '../options/store/option.effects';
import {SharedOptionModule} from '../options/shared-option.module';
import {AccompagnateurEffects} from '../accompagnateur/store/accompagnateur.effects';
// tslint:disable-next-line:max-line-length
import {PGroupeResolverService} from '../groupe/pgroupe/route-guards/p-groupe-resolver.service';
import {CommercialEffects} from '../commercial/store/commercial.effects';
import {CommercialService} from '../commercial/service/commercial.service';
import {OffreVoyageLimitedEffects} from '../offre-voyage-limited/store/offre-voyage-limited.effects';
import {SharedOffreVoyageLimitedModule} from '../offre-voyage-limited/shared-offre-voyage-limited.module';
import {ListOffreVoyageLimitedResolverService} from './route-guards/list-offre-voyage-limited-resolver.service';
import {SharedVoyageurModule} from '../voyageur/shared-voyageur.module';
import {VoyageurEffects} from '../voyageur/store/voyageur.effects';
import {ListOffreVoyageLimitedComponent} from '../offre-voyage-limited/views/list-offre-voyage-limited/list-offre-voyage-limited.component';
// tslint:disable-next-line:max-line-length
import {ListOffreVoyageByCommercialExterneComponent} from './views/list-offre-voyage-by-commercial-externe/list-offre-voyage-by-commercial-externe.component';
import {SharedDepenseModule} from '../depense/shared-depense.module';
import {DepenseEffects} from '../depense/store/depense.effects';
import {VoucherNationalComponent} from './views/print/voucher-national/voucher-national.component';
import {VoucherInternationalComponent} from './views/print/voucher-international/voucher-international.component';
import {SharedChauffeurModule} from '../chauffeur/shared-chauffeur.module';
import {ChauffeurEffects} from '../chauffeur/store/chauffeur.effects';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkTableModule} from '@angular/cdk/table';
import {VehiculeEffects} from '../vehicule/store/vehicule.effects';
import {VehiculeModule} from '../vehicule/vehicule.module';
import {SharedVehiculeModule} from '../vehicule/shared-vehicule.module';
import {TypeVehiculeEffects} from '../type-vehicule/store/type-vehicule.effects';
import {MarqueVehiculeEffects} from '../marque-vehicule/store/marque-vehicule.effects';
import {SocieteEffects} from '../societe/store/societe.effects';

@NgModule({
  declarations: [
    ListComponent, MainComponent,
    ListOffreVoyageLimitedComponent,
    ListOffreVoyageByCommercialExterneComponent,
    VoucherNationalComponent,
    VoucherInternationalComponent

  ],
  imports: [
    CommonModule,
    SharedAccompagnateurModule,
    SharedOptionModule,
    OffreVoyageRoutingModule,
    StoreModule.forFeature('offreVoyage', fromOffreVoyage.reducer),
    EffectsModule.forFeature([OffreVoyageEffects,
      AgenceEffects,
      ModaliteEffects,
      OptionEffects,
      OffreVoyageLimitedEffects,
      AccompagnateurEffects,
      DepenseEffects,
      VoyageurEffects,
      ChauffeurEffects,
      VehiculeEffects,
      CommercialEffects,
      TypeVehiculeEffects,
      MarqueVehiculeEffects,
      SocieteEffects
    ]),
    SharedModuleModule,
    SharedOffreVoyageModule,
    SharedModaliteModule,
    SharedOffreVoyageLimitedModule,
    SharedVoyageurModule,
    SharedDepenseModule,
    SharedChauffeurModule,
    SharedVehiculeModule
    /* CdkTableModule,
     ScrollingModule,*/
  ],
  entryComponents: [VoucherNationalComponent, VoucherInternationalComponent
  ],
  providers: [
    ListResolverService,
    OffreVoyageResolverService,
    PGroupeResolverService,
    CommercialService,
    ListOffreVoyageLimitedResolverService
  ],
})
export class OffreVoyageModule {
}
