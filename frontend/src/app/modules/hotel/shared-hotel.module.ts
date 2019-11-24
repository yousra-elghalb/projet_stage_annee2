import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HotelService} from './service/hotel.service';
import {DialogUpdateHotelComponent} from './views/dialog-update-hotel/dialog-update-hotel.component';
import {DialogAddHotelComponent} from './views/dialog-add-hotel/dialog-add-hotel.component';
import {SharedModuleModule} from '../../shared-module/shared-module.module';
import {HotelsResolverService} from './route-guards/hotels-resolver.service';
import {AppStarRatingComponent} from './views/star-rating/app-star-rating.component';
import {MatTooltipModule} from '@angular/material';


@NgModule({
  declarations: [
    DialogUpdateHotelComponent,
    DialogAddHotelComponent, AppStarRatingComponent
  ],
  imports: [
    CommonModule,
    SharedModuleModule,
    MatTooltipModule,
  ],
  exports: [
    DialogUpdateHotelComponent,
    DialogAddHotelComponent,
    AppStarRatingComponent
  ],
  entryComponents: [
    DialogUpdateHotelComponent,
    DialogAddHotelComponent
  ],
  providers: [HotelService, HotelsResolverService]
})
export class SharedHotelModule {
}
