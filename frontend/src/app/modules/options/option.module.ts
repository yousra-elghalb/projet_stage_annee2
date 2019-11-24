import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {OptionRoutingModule} from './option-routing.module';
import {ListComponent} from './views/list/list.component';
import {MainComponent} from './views/main/main.component';
import {SharedModuleModule} from '../../shared-module/shared-module.module';
import {StoreModule} from '@ngrx/store';
import * as fromOption from './store/option.reducer';
import {EffectsModule} from '@ngrx/effects';
import {OptionEffects} from './store/option.effects';
import {SharedOptionModule} from './shared-option.module';

@NgModule({
  declarations: [ListComponent, MainComponent],
  imports: [
    CommonModule,
    OptionRoutingModule,
    StoreModule.forFeature('option', fromOption.reducer),
    EffectsModule.forFeature([OptionEffects]),
    SharedModuleModule,
    SharedOptionModule
  ],
  providers: [],
})
export class OptionModule {
}
