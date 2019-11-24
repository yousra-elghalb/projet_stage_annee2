import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VehiculeService} from './service/vehicule.service';
import {DialogAddVehiculeComponent} from './views/dialog-add-vehicule/dialog-add-vehicule.component';
import {SharedModuleModule} from '../../shared-module/shared-module.module';
import {DialogUpdateVehiculeComponent} from './views/dialog-update-vehicule/dialog-update-vehicule.component';
import {VehiculesResolverService} from './route-guards/vehicules-resolver.service';
import {SharedTypeVehiculeModule} from '../type-vehicule/shared-type-vehicule.module';
import {SharedMarqueVehiculeModule} from '../marque-vehicule/shared-marque-vehicule.module';
import {SharedSocieteModule} from '../societe/shared-societe.module';


@NgModule({
  declarations: [
    DialogUpdateVehiculeComponent,
    DialogAddVehiculeComponent
  ],
  imports: [
    CommonModule,
    SharedModuleModule,
    SharedTypeVehiculeModule,
    SharedMarqueVehiculeModule,
    SharedSocieteModule,
  ],
  exports: [
    DialogUpdateVehiculeComponent,
    DialogAddVehiculeComponent],
  entryComponents: [
    DialogUpdateVehiculeComponent,
    DialogAddVehiculeComponent
  ],
  providers: [VehiculeService, VehiculesResolverService]
})
export class SharedVehiculeModule {
}
