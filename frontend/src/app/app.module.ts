import {APP_INITIALIZER, LOCALE_ID, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SharedModuleModule} from './shared-module/shared-module.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {LayoutModule} from '@angular/cdk/layout';
import {
  MatSidenavModule,
  MatListModule,
  MatProgressBarModule,
  MatMenuModule, MatExpansionModule
} from '@angular/material';
import {IndexComponent} from './layouts/index/index.component';
import {MenuHorizontalComponent} from './layouts/menu-horizontal/menu-horizontal.component';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {reducers, metaReducers} from './root-state/reducers';
import {EffectsModule} from '@ngrx/effects';
import {ErrorComponent} from './layouts/alerts/error/error.component';
import {DashboardComponent} from './modules/dashboard/dashboard.component';
import {HeaderComponent} from './layouts/header/header.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AuthInterceptorServiceService} from './interceptors/auth-interceptor-service.service';
import {UserModule} from './modules/user/user.module';
import {MenuVerticalComponent} from './layouts/menu-vertical/menu-vertical.component';
import {CategorieService} from './modules/categorie/service/categorie.service';
import {Error404Component} from './layouts/error404/error404.component';
import {CategoriesResolverService} from './modules/categorie/route-guards/categories-resolver.service';
import {CategorieEffects} from './modules/categorie/store/categorie.effects';
import {registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import {SharedCommercialModule} from './modules/commercial/shared-commercial.module';
import {CommercialEffects} from './modules/commercial/store/commercial.effects';

registerLocaleData(localeFr, 'fr');

export function categoriesProviderFactory(provider: CategorieService) {
  return () => provider.loadCategories();
}

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    MenuHorizontalComponent,
    ErrorComponent,
    DashboardComponent,
    HeaderComponent,
    MenuVerticalComponent,
    Error404Component,
  ],
  imports: [
    CommonModule,
    UserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModuleModule,
    LayoutModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    // RoleModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      }
    }),
    EffectsModule.forRoot([CategorieEffects, CommercialEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    MatProgressBarModule,
    MatMenuModule,
    SharedCommercialModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorServiceService, multi: true},
    CategorieService,
    CategoriesResolverService,
    // {provide: APP_INITIALIZER, useFactory: categoriesProviderFactory, deps: [CategorieService], multi: true}
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
