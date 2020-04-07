import { Component, OnInit, NgZone, Input, OnDestroy, SimpleChanges, OnChanges } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { CoronaMonitorService } from 'src/app/services/corona-monitor.service';

am4core.useTheme(am4themes_animated);


@Component({
  selector: 'country-pie-chart',
  templateUrl: './country-pie-chart.component.html',
  styleUrls: ['./country-pie-chart.component.css']
})
export class CountryPieChartComponent implements OnInit, OnDestroy, OnChanges {

  @Input() country: string;
  chart: am4charts.PieChart;
  countryStatus = {
    total_deaths: 0,
    total_recovered: 0,
    serious_critical: 0,
    active_cases: 0
  };

  isLoading: boolean;

  constructor(private zone: NgZone, private monitorService: CoronaMonitorService) { }

  ngOnInit(): void {
    this.loadCountryStatus();
  }

  loadCountryStatus(){
    this.isLoading = true;
    this.monitorService.GetLastestStateByCountry(this.country).subscribe(
      (countryStatuscontainer) => {
        if (countryStatuscontainer.latest_stat_by_country && countryStatuscontainer.latest_stat_by_country.length > 0) {        
          let countryData = countryStatuscontainer.latest_stat_by_country[0];          
          this.countryStatus = {
            total_deaths: Number(countryData.total_deaths.replace(/,/g,'')),
            total_recovered: Number(countryData.total_recovered.replace(/,/g,'')),
            serious_critical: Number(countryData.serious_critical.replace(/,/g,'')),
            active_cases: Number(countryData.active_cases.replace(/,/g,''))            
          };
        }
        this.createPieComponent();
      }
    );
  }

  createPieComponent() {
    this.chart = am4core.create("pie-chart", am4charts.PieChart);
    this.chart.events.on("ready", () => {
      this.isLoading = false;
    })
    this.zone.runOutsideAngular(() => {
      this.chart.hiddenState.properties.opacity = 0;

      this.chart.data = [
        {
          status: "Recuperados",
          value: this.countryStatus.total_recovered,
          color: am4core.color("#28a745")
        },
        {
          status: "Ativos",
          value: this.countryStatus.active_cases - this.countryStatus.serious_critical,
          color: am4core.color("#17a2b8")          
        },
        {
          status: "Ativos em estado crítico",
          value: this.countryStatus.serious_critical,
          color: am4core.color("#ffc107")
        },
        {
          status: "Mortes",
          value: this.countryStatus.total_deaths,
          color: am4core.color("#dc3545")
        }
      ];

      this.chart.radius = am4core.percent(70);
      this.chart.innerRadius = am4core.percent(40);

      let series = this.chart.series.push(new am4charts.PieSeries());
      series.dataFields.value = "value";
      series.dataFields.category = "status";
      series.slices.template.propertyFields.fill = "color";
      series.labels.template.text = "";
      series.alignLabels = false;

      series.hiddenState.properties.startAngle = 90;
      series.hiddenState.properties.endAngle = 90;
      this.chart.legend = new am4charts.Legend();
      this.chart.legend.position = "left";
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.country && !changes.country.firstChange) {
      this.disposechart();
      this.loadCountryStatus();
    }
  }

  disposechart() {
    if (this.chart)
      this.chart.dispose();
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      this.disposechart();
    });
  }
}
