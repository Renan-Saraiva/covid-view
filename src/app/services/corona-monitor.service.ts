import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ConfigService } from './config.service';
import { RapidAPI } from '../models/config';
import { WorldTotalState } from '../models/world-total-state';
import { StateByCountryContainer, StateByCountryHistoryContainer } from '../models/state-by-country';
import { CasesByCountryContainer, CasesByCountry } from '../models/cases-by-country';
import { map, catchError, retry, groupBy, switchMap, mergeMap, reduce, pluck, concat, toArray } from 'rxjs/operators'
import { of, from, zip } from 'rxjs';
import { array } from '@amcharts/amcharts4/core';

@Injectable({
  providedIn: 'root'
})
export class CoronaMonitorService {

  private apiConfig: RapidAPI;

  constructor(private httpClient: HttpClient, private config: ConfigService) {
    this.apiConfig = config.getConfig().rapidAPI;
  }

  public GetWorldTotalState() {
    return this.httpClient.get<WorldTotalState>(this.apiConfig.url + '/worldstat.php');
  }

  public GetLastestStateByCountry(country: string) {
    const params = new HttpParams().set("country", country);
    return this.httpClient.get<StateByCountryContainer>(
      this.apiConfig.url + '/latest_stat_by_country.php', { params }
    ).pipe(
      map(
        status => {
          if (status && status.latest_stat_by_country && status.latest_stat_by_country.length > 0)
            return this.normalizeCountryData(status.latest_stat_by_country[0]);

          return this.defaultCountryData();
        }
      ),
      retry(3),
      catchError((err) => of(this.defaultCountryData()))
    );
  }

  public GetCasesAllCountry() {
    return this.httpClient.get<CasesByCountryContainer>(this.apiConfig.url + '/cases_by_country.php');
  }

  public GetCountryHistory(country: string) {
    const params = new HttpParams().set("country", country);

    return this.httpClient.get<StateByCountryHistoryContainer>(
      this.apiConfig.url + '/cases_by_particular_country.php', { params }
    ).pipe(
      pluck("stat_by_country"),
      switchMap(
        countryArray => from(countryArray)
      ),
      groupBy(
        countryData => new Date(countryData.record_date).toLocaleDateString()
      ),
      mergeMap(group$ =>
        group$.pipe(
          reduce(
            (acc, cur) => [...acc, cur], [`${group$.key}`]
          ),        
          map(array => this.normalizeCountryData(array.pop()))
        )
      ),
      toArray()
    );
  }

  private normalizeCountryData(countryData: any) {
    return {
      total_cases: Number(countryData.total_cases.replace(/,/g, '')),
      total_deaths: Number(countryData.total_deaths.replace(/,/g, '')),
      total_recovered: Number(countryData.total_recovered.replace(/,/g, '')),
      serious_critical: Number(countryData.serious_critical.replace(/,/g, '')),
      active_cases: Number(countryData.active_cases.replace(/,/g, '')),
      new_cases: Number(countryData.new_cases.replace(/,/g, '')),
      new_deaths: Number(countryData.new_deaths.replace(/,/g, '')),
      update_on: countryData.record_date
    }
  }

  private defaultCountryData() {
    return {
      total_cases: 0,
      total_deaths: 0,
      total_recovered: 0,
      serious_critical: 0,
      active_cases: 0,
      new_cases: 0,
      new_deaths: 0,
      update_on: new Date()
    }
  }
}