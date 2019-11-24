import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AgenceService} from './service/agence.service';
import {DialogUpdateAgenceComponent} from './views/dialog-update-agence/dialog-update-agence.component';
import {DialogAddAgenceComponent} from './views/dialog-add-agence/dialog-add-agence.component';
import {SharedModuleModule} from '../../shared-module/shared-module.module';
import {AgencesResolverService} from './route-guards/agences-resolver.service';


@NgModule({
  declarations: [
    DialogUpdateAgenceComponent,
    DialogAddAgenceComponent
  ],
  imports: [
    CommonModule,
    SharedModuleModule,
  ],
  exports: [
    DialogUpdateAgenceComponent,
    DialogAddAgenceComponent],
  entryComponents: [
    DialogUpdateAgenceComponent,
    DialogAddAgenceComponent
  ],
  providers: [AgenceService, AgencesResolverService]
})
export class SharedAgenceModule {
}
