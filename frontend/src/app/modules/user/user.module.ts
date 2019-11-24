import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './views/login/login.component';
import {UserService} from './service/user.service';
import {SharedModuleModule} from '../../shared-module/shared-module.module';
import {StoreModule} from '@ngrx/store';
import * as fromUser from '../user/store/user.reducer';
import {EffectsModule} from '@ngrx/effects';
import {UserEffects} from './store/user.effects';
import {IsAuthenticatedService} from './route-guards/is-authenticated.service';
import {IsNotAuthenticatedService} from './route-guards/is-not-authenticated.service';
import {UserRolesResolverService} from './route-guards/user-roles-resolver.service';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('user', fromUser.reducer),
    EffectsModule.forFeature([UserEffects]),
    SharedModuleModule
  ],
  providers: [UserService, IsAuthenticatedService, IsNotAuthenticatedService, UserRolesResolverService]
})
export class UserModule {
}
