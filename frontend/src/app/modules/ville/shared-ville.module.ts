import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VilleService} from './service/ville.service';
import {DialogUpdateVilleComponent} from './views/dialog-update-ville/dialog-update-ville.component';
import {DialogAddVilleComponent} from './views/dialog-add-ville/dialog-add-ville.component';
import {SharedModuleModule} from '../../shared-module/shared-module.module';
import {ChipsVilleComponent} from './views/chips-ville/chips-ville.component';
import {SharedPaysModule} from '../pays/shared-pays.module';
import {VillesResolverService} from './route-guards/villes-resolver.service';


@NgModule({
  declarations: [
    DialogUpdateVilleComponent,
    DialogAddVilleComponent,
    ChipsVilleComponent
  ],
  imports: [
    CommonModule,
    SharedModuleModule,
    SharedPaysModule

  ],
  exports: [
    ChipsVilleComponent,
    DialogUpdateVilleComponent,
    DialogAddVilleComponent,
    // SharedPaysModule
  ],
  entryComponents: [
    DialogUpdateVilleComponent,
    DialogAddVilleComponent
  ],
  providers: [VilleService, VillesResolverService]
})
export class SharedVilleModule {
}
