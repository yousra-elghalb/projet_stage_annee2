import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {DialogIframePeimentComponent} from '../../layouts/dialog-iframe-peiment/dialog-iframe-peiment.component';
import {SafePipe} from '../../pipes/safe.pipe';
import {GroupeService} from './service/groupe.service';


@NgModule({
  declarations: [DialogIframePeimentComponent, SafePipe],
  imports: [
    CommonModule,
    FormsModule,

  ],
  exports: [
    FormsModule,
    DialogIframePeimentComponent,
    SafePipe
  ],
  entryComponents: [DialogIframePeimentComponent],
  providers: [GroupeService]
})
export class SharedGroupeModule {
}
