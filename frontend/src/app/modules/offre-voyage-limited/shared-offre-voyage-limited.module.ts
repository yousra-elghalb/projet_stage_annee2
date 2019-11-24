import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModuleModule} from '../../shared-module/shared-module.module';
import {DialogAddOffreVoyageLimitedComponent} from './views/dialog-add-offre-voyage-limited/dialog-add-offre-voyage-limited.component';
import {OffreVoyageLimitedService} from './service/offre-voyage-limited.service';
import {DialogUpdateOffreVoyageLimitedComponent} from './views/dialog-update-offre-voyage-limited/dialog-update-offre-voyage-limited.component';


@NgModule({
  declarations: [DialogAddOffreVoyageLimitedComponent, DialogUpdateOffreVoyageLimitedComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
  ],
  exports: [DialogAddOffreVoyageLimitedComponent],
  entryComponents: [DialogAddOffreVoyageLimitedComponent],
  providers: [OffreVoyageLimitedService]
})
export class SharedOffreVoyageLimitedModule {
}
