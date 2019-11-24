import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AgenceRoutingModule} from './agence-routing.module';
import {ListComponent} from './views/list/list.component';
import {MainComponent} from './views/main/main.component';
import {SharedModuleModule} from '../../shared-module/shared-module.module';
import {StoreModule} from '@ngrx/store';
import * as fromAgence from './store/agence.reducer';
import {EffectsModule} from '@ngrx/effects';
import {AgenceEffects} from './store/agence.effects';
import {AgencesResolverService} from './route-guards/agences-resolver.service';
import {SharedAgenceModule} from './shared-agence.module';

@NgModule({
  declarations: [ListComponent, MainComponent],
  imports: [
    CommonModule,
    AgenceRoutingModule,
    StoreModule.forFeature('agence', fromAgence.reducer),
    EffectsModule.forFeature([AgenceEffects]),
    SharedModuleModule,
    SharedAgenceModule
  ],
  providers: [],
})
export class AgenceModule {
}
