import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ConfigService } from './config.service';
import { RapidAPI } from '../models/config';
import { WorldTotalState } from '../models/world-total-state';
import { StateByCountryCollection } from '../models/state-by-country';
import { CasesByCountry } from '../models/cases-by-country';

@Injectable({
  providedIn: 'root'
})
export class CoronaMonitorService {

  private apiConfig: RapidAPI;
  private headers: HttpHeaders;

  constructor(private httpClient: HttpClient, private config: ConfigService) 
  {
    this.apiConfig = config.getConfig().rapidAPI;  
    this.headers = new HttpHeaders(this.apiConfig.headers);
  }
  
  public GetWorldTotalState() {
    return this.httpClient.get<WorldTotalState>(
      this.apiConfig.url + '/worldstat.php', { 
        headers: this.headers
      }
    );
  }

  public GetStateByCountry(country: string) {
    const params = new HttpParams().set("country", country);

    return this.httpClient.get<StateByCountryCollection>(
      this.apiConfig.url + '/latest_stat_by_country.php', { 
        headers: this.headers,
        params
      }
    );
  }

  public GetCasesAllCountry() {
    return this.httpClient.get<CasesByCountry[]>(
      this.apiConfig.url + '/cases_by_country.php', { 
        headers: this.headers
      }
    );
  }
}