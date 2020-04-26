import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

//Material
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

//Country
import { CountryHistoryComponent } from './country-history/country-history.component';
import { CountryInputComponent } from './country-input/country-input.component';
import { CountryStatusComponent } from './country-status/country-status.component';
import { CountryPieChartComponent } from './country-pie-chart/country-pie-chart.component';
import { CountryTodayChangesComponent } from './country-today-changes/country-today-changes.component';

//Word
import { TopAffectedCountriesComponent } from './top-affected-countries/top-affected-countries.component';
import { AllCountriesTableComponent } from './all-countries-table/all-countries-table.component'
import { WorldStatusComponent } from './world-status/world-status.component';
import { WorldViewComponent } from './world-view/world-view.component';

@NgModule({
  declarations: [
    CountryHistoryComponent,
    CountryInputComponent,
    CountryStatusComponent,
    CountryPieChartComponent,
    CountryTodayChangesComponent,
    TopAffectedCountriesComponent,
    AllCountriesTableComponent,
    WorldStatusComponent,
    WorldViewComponent
  ],
  exports: [
    CountryHistoryComponent,
    CountryInputComponent,
    CountryStatusComponent,
    CountryPieChartComponent,
    CountryTodayChangesComponent,
    TopAffectedCountriesComponent,
    AllCountriesTableComponent,
    WorldStatusComponent,
    WorldViewComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatAutocompleteModule,
    FormsModule,
    RouterModule
  ]
})
export class ComponentsModule { }
