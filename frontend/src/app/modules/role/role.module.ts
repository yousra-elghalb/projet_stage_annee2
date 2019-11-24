import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RoleRoutingModule} from './role-routing.module';
import {StoreModule} from '@ngrx/store';
import * as fromRole from './store/role.reducer';
import {EffectsModule} from '@ngrx/effects';
import {RoleEffects} from './store/role.effects';
import {ListComponent} from './views/list/list.component';
import {MainComponent} from './views/main/main.component';
import {ListResolverService} from './route-guards/list-resolver.service';
import {SharedModuleModule} from '../../shared-module/shared-module.module';
import {PermissionEffects} from '../permission/store/permission.effects';
import {SharedRoleModule} from './shared-role.module';

@NgModule({
  declarations: [ListComponent, MainComponent],
  imports: [
    CommonModule,
    RoleRoutingModule,
    StoreModule.forFeature('role', fromRole.reducer),
    EffectsModule.forFeature([RoleEffects, PermissionEffects]),
    SharedModuleModule,
    SharedRoleModule
  ],
  providers: [
    ListResolverService,
  ],
})
export class RoleModule {
}
