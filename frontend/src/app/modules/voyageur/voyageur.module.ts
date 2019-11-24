import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VoyageurRoutingModule} from './voyageur-routing.module';
import {StoreModule} from '@ngrx/store';
import * as fromVoyageur from './store/voyageur.reducer';
import {EffectsModule} from '@ngrx/effects';
import {VoyageurEffects} from './store/voyageur.effects';
import {ListComponent} from './views/list/list.component';
import {MainComponent} from './views/main/main.component';
import {ListResolverService} from './route-guards/list-resolver.service';
import {SharedModuleModule} from '../../shared-module/shared-module.module';
import {PermissionEffects} from '../permission/store/permission.effects';
import {SharedVoyageurModule} from './shared-voyageur.module';
import {MatBadgeModule} from '@angular/material';
import {GroupeConventionEffects} from '../groupe-convention/store/groupe-convention.effects';
import {SharedGroupeConventionModule} from '../groupe-convention/shared-groupe-convention.module';

@NgModule({
  declarations: [ListComponent, MainComponent],
  imports: [
    CommonModule,
    VoyageurRoutingModule,
    StoreModule.forFeature('voyageur', fromVoyageur.reducer),
    EffectsModule.forFeature([
      VoyageurEffects,
      PermissionEffects,
      GroupeConventionEffects
    ]),
    SharedModuleModule,
    SharedVoyageurModule,
    SharedGroupeConventionModule,
    MatBadgeModule
  ],
  providers: [
    ListResolverService,
  ],
})
export class VoyageurModule {
}
