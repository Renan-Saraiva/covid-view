import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { Country } from '../models/country';
import { CasesByCountry } from '../models/cases-by-country';

@Injectable()
export class CountriesService {

  private httpClient: HttpClient;
  private countries: Country[];
  private countriesUri: string = './assets/data/countries.json';

  constructor(private handler: HttpBackend) {
    this.httpClient = new HttpClient(handler);
  }

  public loadCountriesJSON(): Promise<any> {
    return this.httpClient.get<Country[]>(this.countriesUri)
      .toPromise()
      .then(countries => {
        this.countries = countries;
      });
  }

  public getCountryByInternationalName(name: string): Country {

    name = name.toLocaleLowerCase();

    if (name == "usa")
      name = "united states";

    if (name == "uk")
      name = "united kingdom";

    if (name == "car")
      name = "central african republic";

    if (name == "drc")
      name = "Congo (drc)";

    return this.countries.find(item => item.nome_pais_int.toLowerCase() == name);
  }

  public getCountryByBrazilianName(name: string): Country {
    name = name.toLocaleLowerCase();
    return this.countries.find(item => item.nome_pais.toLocaleLowerCase() == name);
  }

  public getCountriesByInclude(search: string): Country[] {
    search = search.toLocaleLowerCase();
    let filteredCountries = this.countries.filter(item => {
      return item.nome_pais.toLocaleLowerCase().includes(search)
    });
    
    return filteredCountries;
  }

}
