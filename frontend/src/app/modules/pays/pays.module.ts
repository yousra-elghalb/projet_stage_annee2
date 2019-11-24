import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PaysRoutingModule} from './pays-routing.module';
import {ListComponent} from './views/list/list.component';
import {MainComponent} from './views/main/main.component';
import {SharedModuleModule} from '../../shared-module/shared-module.module';
import {StoreModule} from '@ngrx/store';
import * as fromPays from './store/pays.reducer';
import {EffectsModule} from '@ngrx/effects';
import {PaysEffects} from './store/pays.effects';
import {PaysResolverService} from './route-guards/pays-resolver.service';
import {SharedPaysModule} from './shared-pays.module';

@NgModule({
  declarations: [ListComponent, MainComponent],
  imports: [
    CommonModule,
    PaysRoutingModule,
    StoreModule.forFeature('pays', fromPays.reducer),
    EffectsModule.forFeature([PaysEffects]),
    SharedModuleModule,
    SharedPaysModule
  ],
  providers: [],
})
export class PaysModule {
}
