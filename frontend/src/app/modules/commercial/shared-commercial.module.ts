import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommercialService} from './service/commercial.service';
import {DialogUpdateCommercialComponent} from './views/dialog-update-commercial/dialog-update-commercial.component';
import {DialogAddCommercialComponent} from './views/dialog-add-commercial/dialog-add-commercial.component';
import {SharedModuleModule} from '../../shared-module/shared-module.module';
import {SharedRoleModule} from '../role/shared-role.module';
import {DialogUpdateProfleComponent} from './views/dialog-update-profile/dialog-update-profle.component';
import {DialogUpdatePasswordComponent} from './views/dialog-update-password/dialog-update-password.component';


@NgModule({
  declarations: [
    DialogUpdateCommercialComponent,
    DialogAddCommercialComponent,
    DialogUpdateProfleComponent, DialogUpdatePasswordComponent
  ],
  imports: [
    CommonModule,
    SharedModuleModule,
    SharedRoleModule
  ],
  exports: [
    SharedRoleModule,
    DialogUpdateCommercialComponent,
    DialogUpdateProfleComponent, DialogUpdatePasswordComponent,
    DialogAddCommercialComponent
  ],
  entryComponents: [
    DialogUpdateCommercialComponent,
    DialogUpdateProfleComponent,
    DialogAddCommercialComponent, DialogUpdatePasswordComponent
  ],
  providers: [CommercialService]
})
export class SharedCommercialModule {
}
