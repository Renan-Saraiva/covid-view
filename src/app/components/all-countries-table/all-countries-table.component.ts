import { Component, OnInit, ViewChild } from '@angular/core';
import { CoronaMonitorService } from 'src/app/services/corona-monitor.service';
import { CasesByCountryContainer } from 'src/app/models/cases-by-country';
import { CountriesService } from 'src/app/services/countries.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'all-countries-table',
  templateUrl: './all-countries-table.component.html',
  styleUrls: ['./all-countries-table.component.css']
})
export class AllCountriesTableComponent implements OnInit {
  
  displayedColumns: string[] = ['id', 'nome', 'totalCasos', 'totalAtivos', 'totalMortos', 'estadoCritico'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private monitorService: CoronaMonitorService, private countriesServices: CountriesService) 
  { }

  ngOnInit() {
    this.monitorService.GetCasesAllCountry().subscribe(
      (data) => {
        let dataSource = data.countries_stat.map((countryStat) => {
          let country = this.countriesServices.getCountryByInternationalName(countryStat.country_name);
    
            if (country) {
              return {
                "id": country.sigla,
                "nome": country.nome_pais,
                "totalCasos": countryStat.cases,
                "totalAtivos": countryStat.active_cases,
                "totalMortos": countryStat.deaths,
                "estadoCritico": countryStat.serious_critical
              };
            }
          }).filter((item) => {
            if(item)
              return true;
            return false;
          });

        this.paginator.pageSize = 20;
        this.dataSource = new MatTableDataSource(dataSource);      
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }

}
