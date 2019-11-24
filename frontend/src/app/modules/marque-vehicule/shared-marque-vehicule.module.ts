import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MarqueVehiculeService} from './service/marque-vehicule.service';
import {DialogAddMarqueVehiculeComponent} from './views/dialog-add-marque-vehicule/dialog-add-marque-vehicule.component';
import {SharedModuleModule} from '../../shared-module/shared-module.module';
import {DialogUpdateMarqueVehiculeComponent} from './views/dialog-update-marque-vehicule/dialog-update-marque-vehicule.component';
import {MarqueVehiculesResolverService} from './route-guards/marque-vehicules-resolver.service';


@NgModule({
  declarations: [
    DialogUpdateMarqueVehiculeComponent,
    DialogAddMarqueVehiculeComponent
  ],
  imports: [
    CommonModule,
    SharedModuleModule,
  ],
  exports: [
    DialogUpdateMarqueVehiculeComponent,
    DialogAddMarqueVehiculeComponent],
  entryComponents: [
    DialogUpdateMarqueVehiculeComponent,
    DialogAddMarqueVehiculeComponent
  ],
  providers: [MarqueVehiculeService, MarqueVehiculesResolverService]
})
export class SharedMarqueVehiculeModule {
}
