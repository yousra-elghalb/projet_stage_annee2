import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SharedModuleModule} from '../../../shared-module/shared-module.module';
import {PGroupeService} from './service/p-groupe.service';
import {FacturePGroupeComponent} from './views/print/facture-p-groupe/facture-p-groupe.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,

  ],
  exports: [
    FormsModule,
  ],
  entryComponents: [],
  providers: [PGroupeService]
})
export class SharedPGroupeModule {
}
