import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HotelRoutingModule} from './hotel-routing.module';
import {ListComponent} from './views/list/list.component';
import {MainComponent} from './views/main/main.component';
import {SharedModuleModule} from '../../shared-module/shared-module.module';
import {StoreModule} from '@ngrx/store';
import * as fromHotel from './store/hotel.reducer';
import {EffectsModule} from '@ngrx/effects';
import {HotelEffects} from './store/hotel.effects';
import {SharedHotelModule} from './shared-hotel.module';

@NgModule({
  declarations: [ListComponent, MainComponent],
  imports: [
    CommonModule,
    HotelRoutingModule,
    SharedHotelModule,
    StoreModule.forFeature('hotel', fromHotel.reducer),
    EffectsModule.forFeature([HotelEffects]),
    SharedModuleModule,
  ],
  providers: [],
  exports: [
  ]
})
export class HotelModule {
}
