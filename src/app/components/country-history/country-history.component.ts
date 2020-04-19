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
  isLoading: boolean;
  countryHistory = [];
  chart: am4charts.XYChart;

  ngOnInit(): void {
    this.loadHistory();
  }

  loadHistory() {
    this.isLoading = true;
    this.monitorService.GetCountryHistory(this.country).subscribe(
      countryHistory => {
        this.countryHistory = countryHistory;
        this.createPieComponent();
      }
    );
  }

  createPieComponent() {
    this.chart = am4core.create("line-chart", am4charts.XYChart);
    this.chart.events.on("ready", () => {
      this.isLoading = false;
    })
    this.zone.runOutsideAngular(() => {
      // Create axes
      let dateAxis = this.chart.xAxes.push(new am4charts.DateAxis());
      let valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
      this.chart.cursor = new am4charts.XYCursor();
      dateAxis.renderer.minGridDistance = 50;
      
      // Increase contrast by taking evey second color
      this.chart.colors.step = 2;
      this.chart.data = this.countryHistory;

      var createAxisAndSeries = (valuePropertie, name, opposite, bulletParameter) => {        

        // if (this.chart.yAxes.indexOf(valueAxis) != 0) {
        //   valueAxis.syncWithAxis = this.chart.yAxes.getIndex(0);
        // }
        
        let series = this.chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = valuePropertie;
        series.dataFields.dateX = "update_on";
        series.strokeWidth = 2;
        series.yAxis = valueAxis;
        series.name = name;
        series.tooltipText = `${name}: [bold]{valueY}[/]`;
        series.tensionX = 0.8;
        series.showOnInit = true;
        
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
  
      createAxisAndSeries("total_cases", "Total de Casos", false , "triangle");
      createAxisAndSeries("total_recovered", "Recuperados", true, "circle");
      createAxisAndSeries("total_deaths", "Mortos", false,"rectangle");

      this.chart.legend = new am4charts.Legend();
      this.chart.legend.position = "bottom";
      this.chart.legend.scrollable = true;    
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.country && !changes.country.firstChange) {
      this.disposechart();
      this.loadHistory();
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
