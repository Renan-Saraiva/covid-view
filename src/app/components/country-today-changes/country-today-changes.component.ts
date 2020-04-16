import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CoronaMonitorService } from 'src/app/services/corona-monitor.service';

@Component({
  selector: 'country-today-changes',
  templateUrl: './country-today-changes.component.html',
  styleUrls: ['./country-today-changes.component.css']
})
export class CountryTodayChangesComponent implements OnInit, OnChanges {

  @Input() country: string;
  countryStatus = {
    total_cases: 0,
    total_deaths: 0,
    new_cases: 0,
    new_deaths: 0
  };

  isLoading: boolean;

  constructor(private monitorService: CoronaMonitorService) { }

  ngOnInit(): void {
    this.loadCountryStatus();
  }

  loadCountryStatus() {
    this.isLoading = true;
    this.monitorService.GetLastestStateByCountry(this.country).subscribe(
      (countryData) => {
        if (countryData)           
          this.countryStatus = countryData;
          
        this.isLoading = false;
      }
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.country && !changes.country.firstChange) {
      this.loadCountryStatus();
    }
  }
}
