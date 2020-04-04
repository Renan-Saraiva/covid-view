import { Component, OnInit } from '@angular/core';
import { CountriesService } from 'src/app/services/countries.service';
import { Country } from 'src/app/models/country';

@Component({
  selector: 'app-country-input',
  templateUrl: './country-input.component.html',
  styleUrls: ['./country-input.component.css']
})
export class CountryInputComponent implements OnInit {
  options: Country[];
  inputValue: string = '';

  constructor(private countriesService: CountriesService) { }

  ngOnInit(): void {
    this.filterCountries();
  }

  filterCountries() {
    this.options = this.countriesService.getCountriesByInclude(this.inputValue);
  }

  set searchInputValue(event: string) {
    this.inputValue = event;
    this.filterCountries();
  }

  get searchInputValue() {
    return this.inputValue
  }

}
