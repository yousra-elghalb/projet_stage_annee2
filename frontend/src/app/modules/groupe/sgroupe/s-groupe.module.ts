import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import * as fromSGroupe from './store/s-groupe.reducer';
import {EffectsModule} from '@ngrx/effects';
import {SGroupeEffects} from './store/s-groupe.effects';
import {SharedSGroupeModule} from './shared-s-groupe.module';
import {PermissionEffects} from '../../permission/store/permission.effects';
import {SharedModuleModule} from '../../../shared-module/shared-module.module';
import {SGroupeRoutingModule} from './s-groupe-routing.module';
import {GroupeByIdResolverService} from './route-guards/groupe-by-id-resolver.service';
import {GroupeByOffreVoyageResolverService} from './route-guards/groupe-by-offre-voyage-resolver.service';
import {AddGroupeToOffreVoyageComponent} from './views/add-groupe-to-offre-voyage/add-groupe-to-offre-voyage.component';
import {UpdateSGroupeOfOffreVoyageComponent} from './views/update-groupe-of-offre-voyage/update-groupe-of-offre-voyage.component';
import {ListVoyageursSGroupeComponent} from './views/list-voyageurs-groupe/list-voyageurs-groupe.component';
import {SharedGroupeModule} from '../shared-groupe.module';
import {FactureSGroupeComponent} from './views/print/facture-s-groupe/facture-s-groupe.component';
// tslint:disable-next-line:max-line-length
import {ListVoyageurSgroupeInternationalComponent} from './views/print/list-voyageur-sgroupe-international/list-voyageur-sgroupe-international.component';
import {ListVoyageurSgroupeNationalComponent} from './views/print/list-voyageur-sgroupe-national/list-voyageur-sgroupe-national.component';
import {DialogUpdateFactureComponent} from './views/dialog-update-facture/dialog-update-facture.component';
import {MatBadgeModule} from '@angular/material';
import {ListOperationsPaiementComponent} from './views/list-operations-paiement/list-operations-paiement.component';
import {SharedGroupeConventionModule} from '../../groupe-convention/shared-groupe-convention.module';
import {GroupeConventionEffects} from '../../groupe-convention/store/groupe-convention.effects';

@NgModule({
  declarations: [
    AddGroupeToOffreVoyageComponent,
    UpdateSGroupeOfOffreVoyageComponent,
    ListVoyageursSGroupeComponent,
    FactureSGroupeComponent,
    ListVoyageurSgroupeNationalComponent,
    ListVoyageurSgroupeInternationalComponent,
    DialogUpdateFactureComponent,
    ListOperationsPaiementComponent
  ],
  imports: [
    CommonModule,
    SGroupeRoutingModule,
    StoreModule.forFeature('sGroupe', fromSGroupe.reducer),
    EffectsModule.forFeature([SGroupeEffects, GroupeConventionEffects]),
    SharedModuleModule,
    SharedSGroupeModule,
    SharedGroupeModule,
    SharedGroupeConventionModule,
    MatBadgeModule
  ],
  entryComponents: [
    FactureSGroupeComponent,
    ListVoyageurSgroupeNationalComponent,
    DialogUpdateFactureComponent,
    ListOperationsPaiementComponent,
    ListVoyageurSgroupeInternationalComponent],
  providers: [
    GroupeByIdResolverService,
    GroupeByOffreVoyageResolverService
  ],
})
export class SGroupeModule {
}
