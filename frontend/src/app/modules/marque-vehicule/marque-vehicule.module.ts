import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MarqueVehiculeRoutingModule} from './marque-vehicule-routing.module';
import {ListComponent} from './views/list/list.component';
import {MainComponent} from './views/main/main.component';
import {SharedModuleModule} from '../../shared-module/shared-module.module';
import {StoreModule} from '@ngrx/store';
import * as fromMarqueVehicule from './store/marque-vehicule.reducer';
import {EffectsModule} from '@ngrx/effects';
import {MarqueVehiculeEffects} from './store/marque-vehicule.effects';
import {SharedMarqueVehiculeModule} from './shared-marque-vehicule.module';

@NgModule({
  declarations: [ListComponent, MainComponent],
  imports: [
    CommonModule,
    MarqueVehiculeRoutingModule,
    StoreModule.forFeature('marqueVehicule', fromMarqueVehicule.reducer),
    EffectsModule.forFeature([MarqueVehiculeEffects]),
    SharedModuleModule,
    SharedMarqueVehiculeModule
  ],
  providers: [],
})
export class MarqueVehiculeModule {
}
