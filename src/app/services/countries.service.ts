import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { Country } from '../models/country';
import { CasesByCountry } from '../models/cases-by-country';

@Injectable()
export class CountriesService {

  private httpClient: HttpClient;
  private countries: Country[];
  private countriesUri: string = './assets/data/countries.json'; 
  
  constructor(private handler: HttpBackend) 
  {
    this.httpClient = new HttpClient(handler);
  }

  public loadCountriesJSON(): Promise<any> {
    return this.httpClient.get<Country[]>(this.countriesUri)
      .toPromise()
      .then(countries => {
        this.countries = countries;
      });
  }
  
  public getCountryByInternationalName(name: string) : Country {

    if (name == "USA")
      name = "United States";

    if (name == "UK")
      name = "United Kingdom";

    if (name == "CAR")
      name = "Central African Republic";

    if (name == "DRC")
      name = "Congo (DRC)";

    name = name.toLocaleLowerCase();
    return this.countries.find(item => item.nome_pais_int.toLowerCase() == name);
  }

  public getCountryByBrazilianName(name: string) : Country {
    name = name.toLocaleLowerCase();
    return this.countries.find(item => item.nome_pais.toLocaleLowerCase() == name);
  }
  
}
