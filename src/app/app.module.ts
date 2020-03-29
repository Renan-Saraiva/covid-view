import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'
import { ConfigService } from './services/config.service';
import { AppHeaderComponent } from './layout/app-header/app-header.component';
import { AppFooterComponent } from './layout/app-footer/app-footer.component';
import { WorldStatusComponent } from './components/world-status/world-status.component';
import { CountryPickComponent } from './components/country-pick/country-pick.component';
import { HomeComponent } from './pages/home/home.component';
import { CountryComponent } from './pages/country/country.component';
import { GoogleChartsModule } from 'angular-google-charts';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { CountriesService } from './services/countries.service';

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
    CountryPickComponent,
    HomeComponent,
    CountryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    GoogleChartsModule.forRoot(),
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
