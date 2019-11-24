import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ModaliteRoutingModule} from './modalite-routing.module';
import {ListComponent} from './views/list/list.component';
import {MainComponent} from './views/main/main.component';
import {SharedModuleModule} from '../../shared-module/shared-module.module';
import {StoreModule} from '@ngrx/store';
import * as fromModalite from './store/modalite.reducer';
import {EffectsModule} from '@ngrx/effects';
import {ModaliteEffects} from './store/modalite.effects';
import {ModaliteService} from './service/modalite.service';
import {DialogAddModalteComponent} from './views/dialog-add-modalte/dialog-add-modalte.component';
import {DialogUpdateModaliteComponent} from './views/dialog-update-modalite/dialog-update-modalite.component';
import {SharedModaliteModule} from './shared-modalite.module';

@NgModule({
  declarations: [ListComponent, MainComponent],
  imports: [
    CommonModule,
    ModaliteRoutingModule,
    StoreModule.forFeature('modalite', fromModalite.reducer),
    EffectsModule.forFeature([ModaliteEffects]),
    SharedModuleModule,
    SharedModaliteModule
  ],
  providers: [],
  entryComponents: []
})
export class ModaliteModule {
}
