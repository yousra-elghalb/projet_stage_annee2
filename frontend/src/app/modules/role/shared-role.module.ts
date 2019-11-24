import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RoleService} from './service/role.service';
import {DialogUpdateRoleComponent} from './views/dialog-update-role/dialog-update-role.component';
import {DialogAddRoleComponent} from './views/dialog-add-role/dialog-add-role.component';
import {SharedModuleModule} from '../../shared-module/shared-module.module';
import {PermissionService} from '../permission/service/permission.service';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    DialogUpdateRoleComponent,
    DialogAddRoleComponent
  ],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,

  ],
  exports: [
    DialogUpdateRoleComponent,
    FormsModule,
    DialogAddRoleComponent],
  entryComponents: [
    DialogUpdateRoleComponent,
    DialogAddRoleComponent
  ],
  providers: [
    RoleService,
    PermissionService]
})
export class SharedRoleModule {
}
