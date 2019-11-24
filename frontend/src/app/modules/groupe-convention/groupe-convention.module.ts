import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GroupeConventionRoutingModule} from './groupe-convention-routing.module';
import {ListComponent} from './views/list/list.component';
import {MainComponent} from './views/main/main.component';
import {SharedModuleModule} from '../../shared-module/shared-module.module';
import {StoreModule} from '@ngrx/store';
import * as fromGroupeConvention from './store/groupe-convention.reducer';
import {EffectsModule} from '@ngrx/effects';
import {GroupeConventionEffects} from './store/groupe-convention.effects';
import {SharedGroupeConventionModule} from './shared-groupe-convention.module';

@NgModule({
  declarations: [ListComponent, MainComponent],
  imports: [
    CommonModule,
    GroupeConventionRoutingModule,
    SharedGroupeConventionModule,
    StoreModule.forFeature('groupeConvention', fromGroupeConvention.reducer),
    EffectsModule.forFeature([GroupeConventionEffects]),
    SharedModuleModule,
  ],
  providers: [],
})
export class GroupeConventionModule {
}
