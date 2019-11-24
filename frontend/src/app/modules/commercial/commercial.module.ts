import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CommercialRoutingModule} from './commercial-routing.module';
import {ListComponent} from './views/list/list.component';
import {MainComponent} from './views/main/main.component';
import {SharedModuleModule} from '../../shared-module/shared-module.module';
import {StoreModule} from '@ngrx/store';
import * as fromCommercial from './store/commercial.reducer';
import {EffectsModule} from '@ngrx/effects';
import {CommercialEffects} from './store/commercial.effects';
import {ListResolverService} from './route-guards/list-resolver.service';
import {SharedCommercialModule} from './shared-commercial.module';
import {PermissionEffects} from '../permission/store/permission.effects';
import {RoleEffects} from '../role/store/role.effects';
import {AgenceEffects} from '../agence/store/agence.effects';
import {SharedAgenceModule} from '../agence/shared-agence.module';

@NgModule({
  declarations: [ListComponent, MainComponent],
  imports: [
    CommonModule,
    CommercialRoutingModule,
    StoreModule.forFeature('commercial', fromCommercial.reducer),
    EffectsModule.forFeature([CommercialEffects, PermissionEffects, RoleEffects, AgenceEffects]),
    SharedModuleModule,
    SharedCommercialModule,
    SharedAgenceModule,
  ],
  providers: [ListResolverService],
})
export class CommercialModule {
}
