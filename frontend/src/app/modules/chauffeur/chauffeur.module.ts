import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ChauffeurRoutingModule} from './chauffeur-routing.module';
import {ListComponent} from './views/list/list.component';
import {MainComponent} from './views/main/main.component';
import {SharedModuleModule} from '../../shared-module/shared-module.module';
import {StoreModule} from '@ngrx/store';
import * as fromChauffeur from './store/chauffeur.reducer';
import {EffectsModule} from '@ngrx/effects';
import {ChauffeurEffects} from './store/chauffeur.effects';
import {SharedChauffeurModule} from './shared-chauffeur.module';

@NgModule({
  declarations: [ListComponent, MainComponent],
  imports: [
    CommonModule,
    ChauffeurRoutingModule,
    SharedChauffeurModule,
    StoreModule.forFeature('chauffeur', fromChauffeur.reducer),
    EffectsModule.forFeature([ChauffeurEffects]),
    SharedModuleModule,
  ],
  providers: [],
})
export class ChauffeurModule {
}
