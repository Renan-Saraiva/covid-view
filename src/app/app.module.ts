import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, LOCALE_ID } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

//services
import { CountriesService } from './services/countries.service';
import { ConfigService } from './services/config.service';

//interceptor
import { RapidApiInterceptor } from './interceptors/rapid-api.interceptor';

//app modules
import { ComponentsModule } from './components/components.module';
import { LayoutModule } from './layout/layout.module';

//pages
import { WorldComponent } from './pages/world/world.component';
import { CountryComponent } from './pages/country/country.component';

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
    CountryComponent,
    WorldComponent    
  ],
  imports: [
    BrowserModule,
    ComponentsModule,
    LayoutModule,
    HttpClientModule,  
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule
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
