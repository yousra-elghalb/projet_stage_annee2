import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChauffeurService} from './service/chauffeur.service';
import {DialogUpdateChauffeurComponent} from './views/dialog-update-chauffeur/dialog-update-chauffeur.component';
import {DialogAddChauffeurComponent} from './views/dialog-add-chauffeur/dialog-add-chauffeur.component';
import {SharedModuleModule} from '../../shared-module/shared-module.module';
import {ChauffeursResolverService} from './route-guards/chauffeurs-resolver.service';


@NgModule({
  declarations: [
    DialogUpdateChauffeurComponent,
    DialogAddChauffeurComponent
  ],
  imports: [
    CommonModule,
    SharedModuleModule,
  ],
  exports: [
    DialogUpdateChauffeurComponent,
    DialogAddChauffeurComponent],
  entryComponents: [
    DialogUpdateChauffeurComponent,
    DialogAddChauffeurComponent
  ],
  providers: [ChauffeurService, ChauffeursResolverService]
})
export class SharedChauffeurModule {
}
