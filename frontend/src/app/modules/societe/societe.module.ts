import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SocieteRoutingModule} from './societe-routing.module';
import {ListComponent} from './views/list/list.component';
import {MainComponent} from './views/main/main.component';
import {SharedModuleModule} from '../../shared-module/shared-module.module';
import {StoreModule} from '@ngrx/store';
import * as fromSociete from './store/societe.reducer';
import {EffectsModule} from '@ngrx/effects';
import {SocieteEffects} from './store/societe.effects';
import {SharedSocieteModule} from './shared-societe.module';

@NgModule({
  declarations: [ListComponent, MainComponent],
  imports: [
    CommonModule,
    SocieteRoutingModule,
    StoreModule.forFeature('societe', fromSociete.reducer),
    EffectsModule.forFeature([SocieteEffects]),
    SharedModuleModule,
    SharedSocieteModule
  ],
  providers: [],
})
export class SocieteModule {
}
