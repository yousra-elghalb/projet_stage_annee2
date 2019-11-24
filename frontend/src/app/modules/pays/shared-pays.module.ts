import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PaysService} from './service/pays.service';
import {DialogUpdatePaysComponent} from './views/dialog-update-pays/dialog-update-pays.component';
import {DialogAddPaysComponent} from './views/dialog-add-pays/dialog-add-pays.component';
import {SharedModuleModule} from '../../shared-module/shared-module.module';
import {PaysResolverService} from './route-guards/pays-resolver.service';


@NgModule({
  declarations: [
    DialogUpdatePaysComponent,
    DialogAddPaysComponent
  ],
  imports: [
    CommonModule,
    SharedModuleModule,
  ],
  exports: [
    DialogUpdatePaysComponent,
    DialogAddPaysComponent],
  entryComponents: [
    DialogUpdatePaysComponent,
    DialogAddPaysComponent
  ],
  providers: [PaysService, PaysResolverService]
})
export class SharedPaysModule {
}
