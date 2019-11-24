import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VoyageService} from './service/voyage.service';
import {SharedModuleModule} from '../../shared-module/shared-module.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModuleModule,
  ],
  exports: [],
  entryComponents: [],
  providers: [VoyageService]
})
export class SharedVoyageModule {
}
