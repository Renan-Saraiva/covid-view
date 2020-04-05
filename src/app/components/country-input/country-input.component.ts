import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  @Input() header: false = false;
  @Output() selectedValue: EventEmitter<Country> = new EventEmitter();

  constructor(private countriesService: CountriesService) { }

  ngOnInit(): void {
    this.filterCountries();
  }

  keyPressHAndler(key) {
    if (key.charCode === 13) {
      this.selectValue()
    }
  }

  filterCountries() {
    this.options = this.countriesService.getCountriesByInclude(this.inputValue);
  }

  selectValue() {
    let country = this.countriesService.getCountryByBrazilianName(this.inputValue)

    this.selectedValue.emit(country);
  }

  optionSelected(country: string) {
    this.inputValue = country;
  }

  set searchInputValue(event: string) {
    this.inputValue = event;
    this.filterCountries();
  }

  get searchInputValue() {
    return this.inputValue
  }

}
