import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModuleModule} from '../../shared-module/shared-module.module';
import {FormsModule} from '@angular/forms';
import {DialogAddOffreVoyageComponent} from './views/dialog-add-offre-voyage/dialog-add-offre-voyage.component';
import {OffreVoyageService} from './service/offre-voyage.service';
import {DialogUpdateOffreVoyageComponent} from './views/dialog-update-offre-voyage/dialog-update-offre-voyage.component';
import {SharedAgenceModule} from '../agence/shared-agence.module';


@NgModule({
  declarations: [
    DialogAddOffreVoyageComponent,
    DialogUpdateOffreVoyageComponent,
  ],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    SharedAgenceModule

  ],
  exports: [
    FormsModule,
    DialogAddOffreVoyageComponent,
    DialogUpdateOffreVoyageComponent,
  ],
  entryComponents: [
    DialogAddOffreVoyageComponent,
    DialogUpdateOffreVoyageComponent
  ],
  providers: [
    OffreVoyageService]
})
export class SharedOffreVoyageModule {
}
