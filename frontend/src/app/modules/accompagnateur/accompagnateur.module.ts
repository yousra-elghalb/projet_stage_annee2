import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AccompagnateurRoutingModule} from './accompagnateur-routing.module';
import {ListComponent} from './views/list/list.component';
import {MainComponent} from './views/main/main.component';
import {SharedModuleModule} from '../../shared-module/shared-module.module';
import {StoreModule} from '@ngrx/store';
import * as fromAccompagnateur from './store/accompagnateur.reducer';
import {EffectsModule} from '@ngrx/effects';
import {AccompagnateurEffects} from './store/accompagnateur.effects';
import {SharedAccompagnateurModule} from './shared-accompagnateur.module';
import {AccompagnateursResolverService} from './route-guards/accompagnateurs-resolver.service';

@NgModule({
  declarations: [ListComponent, MainComponent],
  imports: [
    CommonModule,
    AccompagnateurRoutingModule,
    SharedAccompagnateurModule,
    StoreModule.forFeature('accompagnateur', fromAccompagnateur.reducer),
    EffectsModule.forFeature([AccompagnateurEffects]),
    SharedModuleModule,
  ],
  providers: [],
})
export class AccompagnateurModule {
}
