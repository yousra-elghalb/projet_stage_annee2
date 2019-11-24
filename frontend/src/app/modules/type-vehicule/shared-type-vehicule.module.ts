import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TypeVehiculeService} from './service/type-vehicule.service';
import {DialogAddTypeVehiculeComponent} from './views/dialog-add-type-vehicule/dialog-add-type-vehicule.component';
import {SharedModuleModule} from '../../shared-module/shared-module.module';
import {DialogUpdateTypeVehiculeComponent} from './views/dialog-update-type-vehicule/dialog-update-type-vehicule.component';
import {TypeVehiculesResolverService} from './route-guards/type-vehicules-resolver.service';


@NgModule({
  declarations: [
    DialogUpdateTypeVehiculeComponent,
    DialogAddTypeVehiculeComponent
  ],
  imports: [
    CommonModule,
    SharedModuleModule,
  ],
  exports: [
    DialogUpdateTypeVehiculeComponent,
    DialogAddTypeVehiculeComponent],
  entryComponents: [
    DialogUpdateTypeVehiculeComponent,
    DialogAddTypeVehiculeComponent
  ],
  providers: [TypeVehiculeService, TypeVehiculesResolverService]
})
export class SharedTypeVehiculeModule {
}
