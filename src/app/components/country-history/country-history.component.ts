import { Component, OnInit, Input, SimpleChanges, NgZone, OnDestroy } from '@angular/core';
import { CoronaMonitorService } from 'src/app/services/corona-monitor.service';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

/* Chart code */
// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

@Component({
  selector: 'country-history',
  templateUrl: './country-history.component.html',
  styleUrls: ['./country-history.component.css']
})
export class CountryHistoryComponent implements OnInit, OnDestroy {

  constructor(private zone: NgZone, private monitorService: CoronaMonitorService) { }

  @Input() country: string;
  isLoadingHistory: boolean;
  isLoadingCase: boolean;
  isLoadingDeath: boolean;
  countryHistory = [];
  chartHistory: am4charts.XYChart;
  chartCase: am4charts.XYChart;
  chartDeath: am4charts.XYChart;

  ngOnInit(): void {
    this.loadHistory();
  }

  loadHistory() {
    
    this.isLoadingHistory = true;
    this.isLoadingCase = true;
    this.isLoadingDeath = true;

    this.monitorService.GetCountryHistory(this.country).subscribe(
      countryHistory => {
        this.countryHistory = countryHistory;
        this.createPieComponent();
      }
    );
  }

  createPieComponent() {
    this.chartHistory = am4core.create("history-chart", am4charts.XYChart);
    this.chartHistory.events.on("ready", () => {
      this.isLoadingHistory = false;      
    });

    this.chartCase = am4core.create("new-case-chart", am4charts.XYChart);
    this.chartCase.events.on("ready", () => {
      this.isLoadingCase = false;      
    });

    this.chartDeath  = am4core.create("new-death-chart", am4charts.XYChart);
    this.chartDeath.events.on("ready", () => {
      this.isLoadingDeath = false;      
    });

    this.zone.runOutsideAngular(() => {


      var createChart = (chart: am4charts.XYChart) => {
        let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        chart.cursor = new am4charts.XYCursor();
        dateAxis.renderer.minGridDistance = 50;
        
        // Increase contrast by taking evey second color
        chart.colors.step = 2;
        chart.data = this.countryHistory;
  
        chart.legend = new am4charts.Legend();
        chart.legend.position = "bottom";
        chart.legend.scrollable = true;
        
        return valueAxis;
      };

      var valueAxisHistory = createChart(this.chartHistory);
      var valueAxisCase = createChart(this.chartCase);
      var valueAxisDeath = createChart(this.chartDeath);
      
      var createAxisAndSeries = (chart: am4charts.XYChart, valueAxis:am4charts.ValueAxis, valuePropertie: string, name: string, opposite:boolean, bulletParameter:string, color: am4core.Color = null) => {        
          
        let series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = valuePropertie;
        series.dataFields.dateX = "update_on";
        series.strokeWidth = 2;
        series.yAxis = valueAxis;
        series.name = name;
        series.tooltipText = `${name}: [bold]{valueY}[/]`;
        series.tensionX = 0.8;
        series.showOnInit = true;

        if (color)
          series.stroke = color;

        let interfaceColors = new am4core.InterfaceColorSet();
        let bullet;
        switch(bulletParameter) {
          case "triangle":
            bullet = series.bullets.push(new am4charts.Bullet());
            bullet.width = 12;
            bullet.height = 12;
            bullet.horizontalCenter = "middle";
            bullet.verticalCenter = "middle";
            
            let triangle = bullet.createChild(am4core.Triangle);
            triangle.stroke = interfaceColors.getFor("background");
            triangle.strokeWidth = 2;
            triangle.direction = "top";
            triangle.width = 12;
            triangle.height = 12;
            break;
          case "rectangle":
            bullet = series.bullets.push(new am4charts.Bullet());
            bullet.width = 10;
            bullet.height = 10;
            bullet.horizontalCenter = "middle";
            bullet.verticalCenter = "middle";
            
            let rectangle = bullet.createChild(am4core.Rectangle);
            rectangle.stroke = interfaceColors.getFor("background");
            rectangle.strokeWidth = 2;
            rectangle.width = 10;
            rectangle.height = 10;
            break;
          default:
            bullet = series.bullets.push(new am4charts.CircleBullet());
            if (color) {
              bullet.circle.stroke = color;
              bullet.circle.fill = am4core.color("white");
            }
            else
              bullet.circle.stroke = interfaceColors.getFor("background");

            bullet.circle.strokeWidth = 2;
            break;
        }
        
        valueAxis.renderer.line.strokeOpacity = 1;
        valueAxis.renderer.line.strokeWidth = 2;
        valueAxis.renderer.line.stroke = series.stroke;
        valueAxis.renderer.labels.template.fill = series.stroke;
        valueAxis.renderer.opposite = opposite;
      }

      createAxisAndSeries(this.chartHistory, valueAxisHistory, "total_recovered", "Recuperados", false, "circle");
      createAxisAndSeries(this.chartHistory, valueAxisHistory, "total_cases", "Total de Casos", false , "triangle");    
      createAxisAndSeries(this.chartHistory, valueAxisHistory, "total_deaths", "Mortos", false,"rectangle");

      
      createAxisAndSeries(this.chartCase, valueAxisCase, "new_cases", "Novos casos", false , "circle", am4core.color("#ffc107"));
      createAxisAndSeries(this.chartDeath, valueAxisDeath, "new_deaths", "Novas mortes", false , "circle", am4core.color("#dc3545"));    
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.country && !changes.country.firstChange) {
      this.disposechart();
      this.loadHistory();
    }
  }

  disposechart() {
    if (this.chartHistory)
      this.chartHistory.dispose();

    if (this.chartCase)
      this.chartCase.dispose();

    if (this.chartDeath)
      this.chartDeath.dispose();
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      this.disposechart();
    });
  }
}
