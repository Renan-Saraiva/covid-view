import { Component, NgZone , OnInit, OnDestroy } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { CountriesService } from 'src/app/services/countries.service';
import { CoronaMonitorService } from 'src/app/services/corona-monitor.service';
import { CasesByCountryContainer } from 'src/app/models/cases-by-country';


am4core.useTheme(am4themes_animated);

@Component({
  selector: 'world-view',
  templateUrl: './world-view.component.html',
  styleUrls: ['./world-view.component.css']
})
export class WorldViewComponent implements OnInit, OnDestroy {

  private chart: am4maps.MapChart;
  private cases: CasesByCountryContainer;
  isLoading = true;

  constructor(private zone: NgZone, private countriesServices: CountriesService, private monitorService: CoronaMonitorService) { }

  ngOnInit() { }

  loadCountriesData() {    
    this.monitorService.GetCasesAllCountry().subscribe(
      (cases) => {
        this.cases = cases;
        this.createMapComponent();
      }
    )
  }

  createMapComponent() {
    this.chart = am4core.create("world-map", am4maps.MapChart);          
    this.chart.events.on("ready", () => {
      this.isLoading = false;
    })
    this.zone.runOutsideAngular(() => {          
      let mapData = this.cases.countries_stat.map((countryStat) => {
      let country = this.countriesServices.getCountryByInternationalName(countryStat.country_name);

        if (country) {
          return {
            "id": country.sigla,
            "name": country.nome_pais,
            "value": countryStat.cases,
            "color": am4core.color("#d21a1a")
          };
        }
        //else
          //console.log(countryStat); TODO: Verificar os que não estão sendo encontrados e ajustar
      });
          
      // Set map definition
      this.chart.geodata = am4geodata_worldLow;
      
      // Set projection
      this.chart.projection = new am4maps.projections.Miller();
      
      // Create map polygon series
      let polygonSeries = this.chart.series.push(new am4maps.MapPolygonSeries());
      polygonSeries.exclude = ["AQ"];
      polygonSeries.useGeodata = true;
      polygonSeries.nonScalingStroke = true;
      polygonSeries.strokeWidth = 0.5;
      polygonSeries.calculateVisualCenter = true;
      
      let imageSeries = this.chart.series.push(new am4maps.MapImageSeries());
      imageSeries.data = mapData;
      imageSeries.dataFields.value = "value";
      
      let imageTemplate = imageSeries.mapImages.template;
      imageTemplate.nonScaling = true
      
      let circle = imageTemplate.createChild(am4core.Circle);
      circle.fillOpacity = 0.7;
      circle.propertyFields.fill = "color";
      circle.tooltipText = "{name}: [bold]{value}[/]";
      
      imageSeries.heatRules.push({
        "target": circle,
        "property": "radius",
        "min": 4,
        "max": 30,
        "dataField": "value"
      })
      
      imageTemplate.adapter.add("latitude", function(latitude, target) {
        let polygon = polygonSeries.getPolygonById(target.dataItem.dataContext["id"]);
        if(polygon){
          return polygon.visualLatitude;
         }
         return latitude;
      })
      
      imageTemplate.adapter.add("longitude", function(longitude, target) {
        let polygon = polygonSeries.getPolygonById(target.dataItem.dataContext["id"]);
        if(polygon){
          return polygon.visualLongitude;
         }         
         return longitude;
      })
    });
  }

  ngAfterViewInit() {
    this.loadCountriesData();
  }
  
  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }     
    });
  }

}
