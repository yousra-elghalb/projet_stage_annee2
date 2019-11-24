import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VoyageurService} from './service/voyageur.service';
import {DialogUpdateVoyageurComponent} from './views/dialog-update-voyageur/dialog-update-voyageur.component';
import {DialogAddVoyageurComponent} from './views/dialog-add-voyageur/dialog-add-voyageur.component';
import {SharedModuleModule} from '../../shared-module/shared-module.module';
import {PermissionService} from '../permission/service/permission.service';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    DialogUpdateVoyageurComponent,
    DialogAddVoyageurComponent
  ],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,

  ],
  exports: [
    DialogUpdateVoyageurComponent,
    FormsModule,
    DialogAddVoyageurComponent],
  entryComponents: [
    DialogUpdateVoyageurComponent,
    DialogAddVoyageurComponent
  ],
  providers: [
    VoyageurService,
    PermissionService]
})
export class SharedVoyageurModule {
}
