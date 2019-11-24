import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DepenseService} from './service/depense.service';
import {DialogAddDepenseComponent} from './views/dialog-add-depense/dialog-add-depense.component';
import {SharedModuleModule} from '../../shared-module/shared-module.module';
import {DialogUpdateDepenseComponent} from './views/dialog-update-depense/dialog-update-depense.component';
import {DepensesResolverService} from './route-guards/depenses-resolver.service';


@NgModule({
  declarations: [
    DialogUpdateDepenseComponent,
    DialogAddDepenseComponent
  ],
  imports: [
    CommonModule,
    SharedModuleModule,
  ],
  exports: [
    DialogUpdateDepenseComponent,
    DialogAddDepenseComponent],
  entryComponents: [
    DialogUpdateDepenseComponent,
    DialogAddDepenseComponent
  ],
  providers: [DepenseService, DepensesResolverService]
})
export class SharedDepenseModule {
}
