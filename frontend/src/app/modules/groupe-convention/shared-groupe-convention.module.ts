import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GroupeConventionService} from './service/groupe-convention.service';
import {DialogUpdateGroupeConventionComponent} from './views/dialog-update-groupe-convention/dialog-update-groupe-convention.component';
import {DialogAddGroupeConventionComponent} from './views/dialog-add-groupe-convention/dialog-add-groupe-convention.component';
import {SharedModuleModule} from '../../shared-module/shared-module.module';
import {GroupeConventionsResolverService} from './route-guards/groupe-conventions-resolver.service';


@NgModule({
  declarations: [
    DialogUpdateGroupeConventionComponent,
    DialogAddGroupeConventionComponent
  ],
  imports: [
    CommonModule,
    SharedModuleModule,
  ],
  exports: [
    DialogUpdateGroupeConventionComponent,
    DialogAddGroupeConventionComponent],
  entryComponents: [
    DialogUpdateGroupeConventionComponent,
    DialogAddGroupeConventionComponent
  ],
  providers: [GroupeConventionService, GroupeConventionsResolverService]
})
export class SharedGroupeConventionModule {
}
