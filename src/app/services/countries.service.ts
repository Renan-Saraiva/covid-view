import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '../models/country';

@Injectable()
export class CountriesService {

  private countries: Country[];
  private countriesUri: string = './assets/data/countries.json'; 
  
  constructor(private httpClient: HttpClient) {  }

  public loadCountriesJSON(): Promise<any> {
    return this.httpClient.get<Country[]>(this.countriesUri)
      .toPromise()
      .then(countries => {
        this.countries = countries;
      });
  }
  
  public getCountryByInternationalName(name: string) : Country {
    name = name.toLocaleLowerCase();    
    return this.countries.find(item => item.nome_pais_int.toLowerCase() == name);
  }

  public getCountryByBrazilianName(name: string) : Country {
    name = name.toLocaleLowerCase();   
    return this.countries.find(item => item.nome_pais.toLocaleLowerCase() == name);
  }
  
}
