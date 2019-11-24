import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {VilleRoutingModule} from './ville-routing.module';
import {ListComponent} from './views/list/list.component';
import {MainComponent} from './views/main/main.component';
import {SharedModuleModule} from '../../shared-module/shared-module.module';
import {StoreModule} from '@ngrx/store';
import * as fromVille from './store/ville.reducer';
import {EffectsModule} from '@ngrx/effects';
import {VilleEffects} from './store/ville.effects';
import {VillesResolverService} from './route-guards/villes-resolver.service';
import {SharedVilleModule} from './shared-ville.module';
import {PaysEffects} from '../pays/store/pays.effects';
import {SharedPaysModule} from '../pays/shared-pays.module';

@NgModule({
  declarations: [ListComponent, MainComponent],
  imports: [
    CommonModule,
    VilleRoutingModule,
    StoreModule.forFeature('ville', fromVille.reducer),
    EffectsModule.forFeature([VilleEffects, PaysEffects]),
    SharedModuleModule,
    SharedVilleModule,
  ],
  providers: [],
})
export class VilleModule {
}
