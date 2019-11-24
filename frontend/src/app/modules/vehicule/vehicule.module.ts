import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {VehiculeRoutingModule} from './vehicule-routing.module';
import {ListComponent} from './views/list/list.component';
import {MainComponent} from './views/main/main.component';
import {SharedModuleModule} from '../../shared-module/shared-module.module';
import {StoreModule} from '@ngrx/store';
import * as fromVehicule from './store/vehicule.reducer';
import {EffectsModule} from '@ngrx/effects';
import {VehiculeEffects} from './store/vehicule.effects';
import {SharedVehiculeModule} from './shared-vehicule.module';
import {TypeVehiculeEffects} from '../type-vehicule/store/type-vehicule.effects';
import {MarqueVehiculeEffects} from '../marque-vehicule/store/marque-vehicule.effects';
import {SocieteEffects} from '../societe/store/societe.effects';

@NgModule({
  declarations: [ListComponent, MainComponent],
  imports: [
    CommonModule,
    VehiculeRoutingModule,
    StoreModule.forFeature('vehicule', fromVehicule.reducer),
    EffectsModule.forFeature([
      VehiculeEffects,
      TypeVehiculeEffects,
      MarqueVehiculeEffects,
      SocieteEffects
    ]),
    SharedModuleModule,
    SharedVehiculeModule
  ],
  providers: [],
})
export class VehiculeModule {
}
