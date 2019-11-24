import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModuleModule} from '../../shared-module/shared-module.module';
import {FormsModule} from '@angular/forms';
import {SharedAgenceModule} from '../agence/shared-agence.module';
import {DialogUpdateModaliteComponent} from './views/dialog-update-modalite/dialog-update-modalite.component';
import {ModaliteService} from './service/modalite.service';
import {DialogAddModalteComponent} from './views/dialog-add-modalte/dialog-add-modalte.component';
import {ModalitesResolverService} from './route-guards/modalites-resolver.service';


@NgModule({
  declarations: [
    DialogAddModalteComponent,
    DialogUpdateModaliteComponent
  ],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    SharedAgenceModule

  ],
  exports: [
    FormsModule,
    DialogAddModalteComponent,
    DialogUpdateModaliteComponent,
  ],
  entryComponents: [
    DialogAddModalteComponent,
    DialogUpdateModaliteComponent
  ],
  providers: [
    ModaliteService,
    ModalitesResolverService
  ]
})
export class SharedModaliteModule {
}
