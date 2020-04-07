import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { CoronaMonitorService } from 'src/app/services/corona-monitor.service';
import { StateByCountry } from 'src/app/models/state-by-country';
import { CountriesService } from 'src/app/services/countries.service';
import { Country } from 'src/app/models/country';
import { cos } from '@amcharts/amcharts4/.internal/core/utils/Math';

@Component({
  selector: 'country-status',
  templateUrl: './country-status.component.html',
  styleUrls: ['./country-status.component.css']
})
export class CountryStatusComponent implements OnInit, OnChanges {

  @Input() country: string;
  countryInfo: Country = new Country();
  isLoading: boolean;
  countryStatus = {
    total_cases: 0,
    total_deaths: 0,
    total_recovered: 0,
    serious_critical: 0,
    active_cases: 0,
    update_on: new Date()
  };

  constructor(private monitorService: CoronaMonitorService, private countryService: CountriesService) { }

  ngOnInit(): void {
    this.loadCountryStatus();
  }

  loadCountryStatus() {
    this.isLoading = true;
    let country = this.countryService.getCountryByInternationalName(this.country);
    if (country)
      this.countryInfo = country;

    this.monitorService.GetLastestStateByCountry(this.country).subscribe(
      (countryStatuscontainer) => {
        if (countryStatuscontainer.latest_stat_by_country && countryStatuscontainer.latest_stat_by_country.length > 0) {

          let countryData = countryStatuscontainer.latest_stat_by_country[0];
          this.countryStatus = {
            total_cases: Number(countryData.total_cases.replace(/,/g, '')),
            total_deaths: Number(countryData.total_deaths.replace(/,/g, '')),
            total_recovered: Number(countryData.total_recovered.replace(/,/g, '')),
            serious_critical: Number(countryData.serious_critical.replace(/,/g, '')),
            active_cases: Number(countryData.active_cases.replace(/,/g, '')),
            update_on: countryData.record_date
          };
        }
        this.isLoading = false;
      }
    )
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.country && !changes.country.firstChange) {
      this.loadCountryStatus();
    }
  }
}
