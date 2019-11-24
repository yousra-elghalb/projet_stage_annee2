import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CategorieService} from './service/categorie.service';
import {DialogUpdateCategorieComponent} from './views/dialog-update-categorie/dialog-update-categorie.component';
import {DialogAddCategorieComponent} from './views/dialog-add-categorie/dialog-add-categorie.component';
import {SharedModuleModule} from '../../shared-module/shared-module.module';
import {CategoriesResolverService} from './route-guards/categories-resolver.service';
import {SharedSousCategorieModule} from '../sous-categorie/shared-sous-categorie.module';


@NgModule({
  declarations: [
    DialogUpdateCategorieComponent,
    DialogAddCategorieComponent
  ],
  imports: [
    CommonModule,
    SharedModuleModule,
    SharedSousCategorieModule,
  ],
  exports: [
    DialogUpdateCategorieComponent,
    DialogAddCategorieComponent],
  entryComponents: [
    DialogUpdateCategorieComponent,
    DialogAddCategorieComponent
  ],
  providers: [CategorieService, CategoriesResolverService]
})
export class SharedCategorieModule {
}
