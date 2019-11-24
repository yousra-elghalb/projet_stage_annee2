import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TypeVehiculeRoutingModule} from './type-vehicule-routing.module';
import {ListComponent} from './views/list/list.component';
import {MainComponent} from './views/main/main.component';
import {SharedModuleModule} from '../../shared-module/shared-module.module';
import {StoreModule} from '@ngrx/store';
import * as fromTypeVehicule from './store/type-vehicule.reducer';
import {EffectsModule} from '@ngrx/effects';
import {TypeVehiculeEffects} from './store/type-vehicule.effects';
import {SharedTypeVehiculeModule} from './shared-type-vehicule.module';

@NgModule({
  declarations: [ListComponent, MainComponent],
  imports: [
    CommonModule,
    TypeVehiculeRoutingModule,
    StoreModule.forFeature('typeVehicule', fromTypeVehicule.reducer),
    EffectsModule.forFeature([TypeVehiculeEffects]),
    SharedModuleModule,
    SharedTypeVehiculeModule
  ],
  providers: [],
})
export class TypeVehiculeModule {
}
