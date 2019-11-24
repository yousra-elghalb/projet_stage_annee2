import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SocieteService} from './service/societe.service';
import {DialogAddSocieteComponent} from './views/dialog-add-societe/dialog-add-societe.component';
import {SharedModuleModule} from '../../shared-module/shared-module.module';
import {DialogUpdateSocieteComponent} from './views/dialog-update-societe/dialog-update-societe.component';
import {SocietesResolverService} from './route-guards/societes-resolver.service';


@NgModule({
  declarations: [
    DialogUpdateSocieteComponent,
    DialogAddSocieteComponent
  ],
  imports: [
    CommonModule,
    SharedModuleModule,
  ],
  exports: [
    DialogUpdateSocieteComponent,
    DialogAddSocieteComponent],
  entryComponents: [
    DialogUpdateSocieteComponent,
    DialogAddSocieteComponent
  ],
  providers: [SocieteService, SocietesResolverService]
})
export class SharedSocieteModule {
}
