import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SousCategorieService} from './service/sous-categorie.service';
import {SharedModuleModule} from '../../shared-module/shared-module.module';
import {SousCategoriesResolverService} from './route-guards/sous-categories-resolver.service';
import {DialogUpdateSousCategorieComponent} from './views/dialog-update-sous-categorie/dialog-update-sous-categorie.component';
import {DialogAddSousCategorieComponent} from './views/dialog-add-sous-categorie/dialog-add-sous-categorie.component';
import {EffectsModule} from '@ngrx/effects';
import {SousCategorieEffects} from './store/sous-categorie.effects';
import {ChipsSousCategoriesComponent} from './views/chips-sous-categories/chips-sous-categories.component';


@NgModule({
  declarations: [
    DialogUpdateSousCategorieComponent,
    DialogAddSousCategorieComponent,
    ChipsSousCategoriesComponent
  ],
  imports: [
    CommonModule,
    SharedModuleModule,
    EffectsModule.forFeature([SousCategorieEffects]),

  ],
  exports: [
    EffectsModule,
    ChipsSousCategoriesComponent,
    DialogUpdateSousCategorieComponent,
    DialogAddSousCategorieComponent],
  entryComponents: [
    DialogUpdateSousCategorieComponent,
    DialogAddSousCategorieComponent
  ],
  providers: [SousCategorieService, SousCategoriesResolverService]
})
export class SharedSousCategorieModule {
}
