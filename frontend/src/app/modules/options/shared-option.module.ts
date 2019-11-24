import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OptionService} from './service/option.service';
import {DialogAddOptionComponent} from './views/dialog-add-option/dialog-add-option.component';
import {SharedModuleModule} from '../../shared-module/shared-module.module';
import {DialogUpdateOptionComponent} from './views/dialog-update-option/dialog-update-option.component';
import {OptionsResolverService} from './route-guards/options-resolver.service';


@NgModule({
  declarations: [
    DialogUpdateOptionComponent,
    DialogAddOptionComponent
  ],
  imports: [
    CommonModule,
    SharedModuleModule,
  ],
  exports: [
    DialogUpdateOptionComponent,
    DialogAddOptionComponent],
  entryComponents: [
    DialogUpdateOptionComponent,
    DialogAddOptionComponent
  ],
  providers: [OptionService, OptionsResolverService]
})
export class SharedOptionModule {
}
