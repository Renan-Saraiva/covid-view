import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { ConfigService } from './services/config.service';
import { AppHeaderComponent } from './layout/app-header/app-header.component';
import { AppFooterComponent } from './layout/app-footer/app-footer.component';
import { WorldStatusComponent } from './components/world-status/world-status.component';
import { HomeComponent } from './pages/home/home.component';
import { CountryComponent } from './pages/country/country.component';
import { GoogleChartsModule } from 'angular-google-charts';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { CountriesService } from './services/countries.service';
import { WorldViewComponent } from './components/world-view/world-view.component';
import { TopAffectedCountriesComponent } from './components/top-affected-countries/top-affected-countries.component';
import { AllCountriesTableComponent } from './components/all-countries-table/all-countries-table.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { RapidApiInterceptor } from './interceptors/rapid-api.interceptor';
import {MatCheckboxModule} from '@angular/material/checkbox';


const appConfig = (configService: ConfigService) => {
  return () => {
    return configService.loadConfigJSON();
  }
}

const appCountries = (countriesServices: CountriesService) => {
  return () => {
    return countriesServices.loadCountriesJSON();
  }
}

registerLocaleData(localePt, 'pt');

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppFooterComponent,
    WorldStatusComponent,
    HomeComponent,
    CountryComponent,
    WorldViewComponent,
    TopAffectedCountriesComponent,
    AllCountriesTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    GoogleChartsModule.forRoot(),
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule
  ],
  providers: [
    ConfigService, {
      provide: APP_INITIALIZER,
      useFactory: appConfig,
      multi: true,
      deps: [ConfigService]
    },
    CountriesService, {
      provide: APP_INITIALIZER,
      useFactory: appCountries,
      multi: true,
      deps: [CountriesService]
    },
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: HTTP_INTERCEPTORS, useClass: RapidApiInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
