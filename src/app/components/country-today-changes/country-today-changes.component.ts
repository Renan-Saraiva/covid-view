import { Component, OnInit, Input } from '@angular/core';
import { CoronaMonitorService } from 'src/app/services/corona-monitor.service';

@Component({
  selector: 'country-today-changes',
  templateUrl: './country-today-changes.component.html',
  styleUrls: ['./country-today-changes.component.css']
})
export class CountryTodayChangesComponent implements OnInit {

  @Input() country: string;
  countryStatus = {
    total_cases: 0,
    total_deaths: 0,
    new_cases: 0,
    new_deaths: 0
  };

  isLoading = true;

  constructor(private monitorService: CoronaMonitorService) { }

  ngOnInit(): void {
    this.monitorService.GetLastestStateByCountry(this.country).subscribe(
      (countryStatuscontainer) => {
        if (countryStatuscontainer.latest_stat_by_country && countryStatuscontainer.latest_stat_by_country.length > 0) {        
          let countryData = countryStatuscontainer.latest_stat_by_country[0];    
          
          countryData.new_deaths
          
          this.countryStatus = {
            total_cases: Number(countryData.total_cases.replace(/,/g,'')),
            total_deaths: Number(countryData.total_deaths.replace(/,/g,'')),
            new_cases: Number(countryData.new_cases.replace(/,/g,'')),
            new_deaths: Number(countryData.new_deaths.replace(/,/g,''))            
          };
        }
        this.isLoading = false;
      }
    );
  }
}
