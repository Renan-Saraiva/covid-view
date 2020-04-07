import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CountriesService } from 'src/app/services/countries.service';
import { Country } from 'src/app/models/country';
import { MatOptionSelectionChange } from '@angular/material/core';

@Component({
  selector: 'app-country-input',
  templateUrl: './country-input.component.html',
  styleUrls: ['./country-input.component.css']
})
export class CountryInputComponent implements OnInit {
  options: Country[];
  inputValue: string = '';
  @Input() header: false = false;
  @Output() selectedValue: EventEmitter<Country> = new EventEmitter();

  constructor(private countriesService: CountriesService) { }

  ngOnInit(): void {
    this.filterCountries();
  }

  selectValue() {
    let country = this.countriesService.getCountryByBrazilianName(this.inputValue)
    this.selectedValue.emit(country);
  }

  keyPressHAndler(key) {
    if (key.charCode === 13) {
      this.selectValue()
    }
  }

  filterCountries() {
    this.options = this.countriesService.getCountriesByInclude(this.inputValue);
  }

  optionSelected(event: MatOptionSelectionChange, country: string) {
    if (event.source.selected) {
      this.inputValue = country;
      this.selectValue();
    }      
  }

  set searchInputValue(event: string) {
    this.inputValue = event;
    this.filterCountries();
  }

  get searchInputValue() {
    return this.inputValue
  }

}
