import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateLoader, TranslateModule, TranslateService, TranslateStore} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SubHeaderComponent} from '../layouts/sub-header/sub-header.component';
import {
  DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE,
  MAT_SNACK_BAR_DEFAULT_OPTIONS, MatAutocompleteModule,
  MatButtonModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule,
  MatDialogModule, MatDialogRef,
  MatDividerModule, MatFormFieldModule, MatGridListModule,
  MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule,
  MatPaginatorModule, MatProgressSpinnerModule, MatSelectModule, MatSnackBarModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ConfirmComponent} from '../layouts/alerts/confirm/confirm.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ErrorFormComponent} from '../layouts/alerts/error-form/error-form.component';
import {SubHeaderSearchComponent} from '../layouts/sub-header-search/sub-header-search.component';
import {FileInputConfig, MaterialFileInputModule, NGX_MAT_FILE_INPUT_CONFIG} from 'ngx-material-file-input';
import {ScrollingModule} from '@angular/cdk/scrolling';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export const config: FileInputConfig = {
  sizeUnit: 'Octet'
};

/*
export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};
*/


@NgModule({
  declarations: [
    SubHeaderComponent,
    ConfirmComponent,
    ErrorFormComponent,
    SubHeaderSearchComponent,
  ],
  imports: [
    MatMenuModule,
    ScrollingModule,
    CommonModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MaterialFileInputModule,
    MatListModule,
    MatCheckboxModule,
    MatGridListModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatFormFieldModule,
    MatDividerModule,
    MatDialogModule,
    FlexLayoutModule,
    MatPaginatorModule,
    MatTableModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatSnackBarModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      // isolate: true
    })
  ],
  exports: [
    ScrollingModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MaterialFileInputModule,
    MatGridListModule,
    MatListModule,
    MatCheckboxModule,
    MatSelectModule,
    MatChipsModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
    MatToolbarModule,
    ConfirmComponent,
    SubHeaderComponent,
    TranslateModule,
    FlexLayoutModule,
    ErrorFormComponent,
    MatCardModule,
    SubHeaderSearchComponent,
  ],
  providers: [
    TranslateStore,
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}},
    {provide: NGX_MAT_FILE_INPUT_CONFIG, useValue: config},
    /*  {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
      {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},*/
  ],
  entryComponents: [
    ConfirmComponent
  ]
})
export class SharedModuleModule {
}
