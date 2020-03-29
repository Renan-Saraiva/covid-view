import { Component, NgZone, OnInit } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'top-affected-countries',
  templateUrl: './top-affected-countries.component.html',
  styleUrls: ['./top-affected-countries.component.css']
})
export class TopAffectedCountriesComponent implements OnInit {

  private chart: am4charts.XYChart;

  constructor(private zone: NgZone) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.createMapComponent();
  }

  createMapComponent() {
    this.chart = am4core.create("chart-div", am4charts.XYChart);
    this.chart.events.on("ready", () => {

    })
    this.zone.runOutsideAngular(() => {

      // Add data
      this.chart.data = [{
        "name": "Brasil",
        "points": 35654,
        "color": this.chart.colors.next(),
        "bullet": "https://www.countryflags.io/br/shiny/64.png"
      }, {
        "name": "Russia",
        "points": 65456,
        "color": this.chart.colors.next(),
        "bullet": "https://www.countryflags.io/ru/shiny/64.png"
      }, {
        "name": "Equador",
        "points": 45724,
        "color": this.chart.colors.next(),
        "bullet": "https://www.countryflags.io/rw/shiny/64.png"
      }, {
        "name": "Monaco",
        "points": 13654,
        "color": this.chart.colors.next(),
        "bullet": "https://www.countryflags.io/mc/shiny/64.png"
      }, {
        "name": "Canada",
        "points": 13654,
        "color": this.chart.colors.next(),
        "bullet": "https://www.countryflags.io/ca/shiny/64.png"
      }, {
        "name": "Belarus",
        "points": 13654,
        "color": this.chart.colors.next(),
        "bullet": "https://www.countryflags.io/by/shiny/64.png"
      }];

      // Create axes
      let categoryAxis = this.chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "name";
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
      series.dataFields.valueY = "points";
      series.dataFields.categoryX = "name";
      series.columns.template.propertyFields.fill = "color";
      series.columns.template.propertyFields.stroke = "color";
      series.columns.template.column.cornerRadiusTopLeft = 15;
      series.columns.template.column.cornerRadiusTopRight = 15;
      series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/b]";

      // Add bullets
      let bullet = series.bullets.push(new am4charts.Bullet());
      let image = bullet.createChild(am4core.Image);
      image.horizontalCenter = "middle";
      image.verticalCenter = "bottom";
      image.dy = 20;
      image.y = am4core.percent(100);
      image.propertyFields.href = "bullet";
      image.tooltipText = series.columns.template.tooltipText;
      image.propertyFields.fill = "color";
      image.filters.push(new am4core.DropShadowFilter());
    });
  }

}
