import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import * as fromPGroupe from './store/p-groupe.reducer';
import {EffectsModule} from '@ngrx/effects';
import {PGroupeEffects} from './store/p-groupe.effects';
import {SharedPGroupeModule} from './shared-p-groupe.module';
import {ListVoyageursComponent} from './views/list-voyageur/list-voyageurs.component';
import {PermissionEffects} from '../../permission/store/permission.effects';
import {SharedModuleModule} from '../../../shared-module/shared-module.module';
import {PGroupeResolverService} from './route-guards/p-groupe-resolver.service';
import {PGroupesResolverService} from './route-guards/p-groupes-resolver.service';
import {PGroupeRoutingModule} from './p-groupe-routing.module';
import {AddVoyageurToOffreVoyageComponent} from './views/add-voyageur-to-offre-voyage/add-voyageur-to-offre-voyage.component';
import {UpdateVoyageursOfOffreVoyageComponent} from './views/update-voyageurs-of-offre-voyage/update-voyageurs-of-offre-voyage.component';
import {SharedGroupeModule} from '../shared-groupe.module';
import {ListVoyageurPgroupeNationalComponent} from './views/print/list-voyageur-pgroupe-national/list-voyageur-pgroupe-national.component';
import {DialogUpdateFactureComponent} from './views/dialog-update-facture/dialog-update-facture.component';
import {FacturePGroupeComponent} from './views/print/facture-p-groupe/facture-p-groupe.component';
// tslint:disable-next-line:max-line-length
import {ListVoyageurPgroupeInternationalComponent} from './views/print/list-voyageur-pgroupe-international/list-voyageur-pgroupe-international.component';
import {AllFacturePGroupeComponent} from './views/print/all-facture-p-groupe/all-facture-p-groupe.component';
import {MatBadgeModule} from '@angular/material';
import {ListOperationsPaiementComponent} from './views/list-operations-paiement/list-operations-paiement.component';

@NgModule({
  declarations: [
    ListVoyageursComponent,
    AddVoyageurToOffreVoyageComponent,
    UpdateVoyageursOfOffreVoyageComponent,
    ListVoyageurPgroupeNationalComponent,
    FacturePGroupeComponent,
    ListVoyageurPgroupeInternationalComponent,
    DialogUpdateFactureComponent,
    AllFacturePGroupeComponent,
    ListOperationsPaiementComponent
  ],
  imports: [
    CommonModule,
    PGroupeRoutingModule,
    StoreModule.forFeature('pGroupe', fromPGroupe.reducer),
    EffectsModule.forFeature([PGroupeEffects, PermissionEffects]),
    SharedModuleModule,
    SharedPGroupeModule,
    SharedGroupeModule,
    MatBadgeModule
  ],
  entryComponents: [ListVoyageurPgroupeNationalComponent,
    DialogUpdateFactureComponent,
    FacturePGroupeComponent,
    ListVoyageurPgroupeInternationalComponent,
    AllFacturePGroupeComponent,
    ListOperationsPaiementComponent
  ],
  providers: [
    PGroupeResolverService,
    PGroupesResolverService,
  ],
})
export class PGroupeModule {
}
