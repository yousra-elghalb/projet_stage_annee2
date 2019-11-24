import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {SharedModuleModule} from '../../shared-module/shared-module.module';
import {ListComponent} from './views/list/list.component';
import {MainComponent} from './views/main/main.component';
import {SousCategoriesResolverService} from './route-guards/sous-categories-resolver.service';
import {SousCategorieEffects} from './store/sous-categorie.effects';
import * as fromSousCategorie from './store/sous-categorie.reducer';
import {SousCategorieRoutingModule} from './sous-categorie-routing.module';
import {SharedSousCategorieModule} from './shared-sous-categorie.module';


@NgModule({
  declarations: [ListComponent, MainComponent],
  imports: [
    CommonModule,
    SousCategorieRoutingModule,
    StoreModule.forFeature('sousCategorie', fromSousCategorie.reducer),
    SharedSousCategorieModule,
    SharedModuleModule,
  ], providers: []
})
export class SousCategorieModule {
}
