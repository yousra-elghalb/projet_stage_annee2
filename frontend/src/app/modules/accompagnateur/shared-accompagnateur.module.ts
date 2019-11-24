import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccompagnateurService} from './service/accompagnateur.service';
import {DialogUpdateAccompagnateurComponent} from './views/dialog-update-accompagnateur/dialog-update-accompagnateur.component';
import {DialogAddAccompagnateurComponent} from './views/dialog-add-accompagnateur/dialog-add-accompagnateur.component';
import {SharedModuleModule} from '../../shared-module/shared-module.module';
import {AccompagnateursResolverService} from './route-guards/accompagnateurs-resolver.service';


@NgModule({
  declarations: [
    DialogUpdateAccompagnateurComponent,
    DialogAddAccompagnateurComponent
  ],
  imports: [
    CommonModule,
    SharedModuleModule,
  ],
  exports: [
    DialogUpdateAccompagnateurComponent,
    DialogAddAccompagnateurComponent],
  entryComponents: [
    DialogUpdateAccompagnateurComponent,
    DialogAddAccompagnateurComponent
  ],
  providers: [AccompagnateurService, AccompagnateursResolverService]
})
export class SharedAccompagnateurModule {
}
