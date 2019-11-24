import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SGroupeService} from './service/s-groupe.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,

  ],
  exports: [
    FormsModule,
  ],
  entryComponents: [],
  providers: [SGroupeService]
})
export class SharedSGroupeModule {
}
