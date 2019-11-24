import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CategorieRoutingModule} from './categorie-routing.module';
import {StoreModule} from '@ngrx/store';
import * as fromCategorie from './store/categorie.reducer';
import {EffectsModule} from '@ngrx/effects';
import {CategorieEffects} from './store/categorie.effects';
import {SharedModuleModule} from '../../shared-module/shared-module.module';
import {ListComponent} from './views/list/list.component';
import {MainComponent} from './views/main/main.component';
import {CategorieService} from './service/categorie.service';
import {CategoriesResolverService} from './route-guards/categories-resolver.service';
import {SharedCategorieModule} from './shared-categorie.module';
import {SharedSousCategorieModule} from '../sous-categorie/shared-sous-categorie.module';


@NgModule({
  declarations: [ListComponent, MainComponent],
  imports: [
    CommonModule,
    SharedCategorieModule,
    CategorieRoutingModule,
    StoreModule.forFeature('categorie', fromCategorie.reducer),
    EffectsModule.forFeature([CategorieEffects]),
    SharedSousCategorieModule,
    SharedModuleModule,
  ], providers: []
})
export class CategorieModule {
}
