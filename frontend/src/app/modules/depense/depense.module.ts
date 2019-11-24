import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DepenseRoutingModule} from './depense-routing.module';
import {ListComponent} from './views/list/list.component';
import {MainComponent} from './views/main/main.component';
import {SharedModuleModule} from '../../shared-module/shared-module.module';
import {StoreModule} from '@ngrx/store';
import * as fromDepense from './store/depense.reducer';
import {EffectsModule} from '@ngrx/effects';
import {DepenseEffects} from './store/depense.effects';
import {SharedDepenseModule} from './shared-depense.module';

@NgModule({
  declarations: [ListComponent, MainComponent],
  imports: [
    CommonModule,
    DepenseRoutingModule,
    StoreModule.forFeature('depense', fromDepense.reducer),
    EffectsModule.forFeature([DepenseEffects]),
    SharedModuleModule,
    SharedDepenseModule
  ],
  providers: [],
})
export class DepenseModule {
}
