import { Component, NgZone, OnInit, OnDestroy } from '@angular/core';
import { CoronaMonitorService } from 'src/app/services/corona-monitor.service';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { CasesByCountryContainer } from 'src/app/models/cases-by-country';
import { CountriesService } from 'src/app/services/countries.service';

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'top-affected-countries',
  templateUrl: './top-affected-countries.component.html',
  styleUrls: ['./top-affected-countries.component.css']
})
export class TopAffectedCountriesComponent implements OnInit, OnDestroy {

  private chart: am4charts.XYChart;
  private topCases: CasesByCountryContainer;
  isLoading = true;

  constructor(private zone: NgZone, private monitorService: CoronaMonitorService, private countriesServices: CountriesService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.loadTopAffectedCountriesData();
  }

  loadTopAffectedCountriesData() {
    this.monitorService.GetCasesAllCountry().subscribe(
      (topCases) => {
        this.topCases = {
          countries_stat: topCases.countries_stat.sort(
            (a, b): number => {
              if (Number(a.cases.replace(/,/g,'')) < Number(b.cases.replace(/,/g,''))) {
                  return 1;
              }          
              if (Number(a.cases.replace(/,/g,'')) > Number(b.cases.replace(/,/g,''))) {
                  return -1;
              }
              return 0;
            }
          ).slice(0,10)
        };
        this.createChartComponent();
      }
    )
  }

  createChartComponent() {
    this.chart = am4core.create("chart-div", am4charts.XYChart);
    this.chart.events.on("ready", () => {
      this.isLoading = false;
    })
    this.zone.runOutsideAngular(() => {

      let chartData = this.topCases.countries_stat.map((countryStat) => {
        let country = this.countriesServices.getCountryByInternationalName(countryStat.country_name);
        if (country) {
          return {
            "id": country.sigla,
            "name": country.nome_pais,
            "cases": countryStat.cases,
            "flag": `https://www.countryflags.io/${country.sigla.toLowerCase()}/shiny/64.png`
          };
        }
      });

      this.chart.data = chartData;     

      // Create axes
      let categoryAxis = this.chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "id";
      categoryAxis.renderer.grid.template.disabled = true;
      categoryAxis.renderer.minGridDistance = 30;
      categoryAxis.renderer.inside = true;
      categoryAxis.renderer.labels.template.fill = am4core.color("#fff");
      categoryAxis.renderer.labels.template.fontSize = 20;

      let valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.renderer.grid.template.strokeDasharray = "4,4";
      valueAxis.renderer.labels.template.disabled = true;
      valueAxis.min = 0;

      // Do not crop bullets
      this.chart.maskBullets = false;

      // Remove padding
      this.chart.paddingBottom = 0;

      // Create series
      let series = this.chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = "cases";
      series.dataFields.categoryX = "id";
      series.columns.template.column.cornerRadiusTopLeft = 15;
      series.columns.template.column.cornerRadiusTopRight = 15;
      series.columns.template.tooltipText = `{name}
      Total de casos: [bold]{cases}[/b]`;
      series.heatRules.push({ target: series.columns.template, property: "fill", dataField: "valueY", min: am4core.color("#faa31d"), max: am4core.color("#e30219") });

      // Add bullets
      let bullet = series.bullets.push(new am4charts.Bullet());
      let image = bullet.createChild(am4core.Image);
      image.horizontalCenter = "middle";
      image.verticalCenter = "bottom";
      image.dy = 20;
      image.y = am4core.percent(100);
      image.propertyFields.href = "flag";
      image.tooltipText = series.columns.template.tooltipText;
      //image.propertyFields.fill = "color";
      image.filters.push(new am4core.DropShadowFilter());
    });
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }     
    });
  }

}
