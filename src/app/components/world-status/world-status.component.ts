import { Component, OnInit } from '@angular/core';
import { CoronaMonitorService } from 'src/app/services/corona-monitor.service';
import { WorldTotalState } from 'src/app/models/world-total-state';

@Component({
  selector: 'world-status',
  templateUrl: './world-status.component.html',
  styleUrls: ['./world-status.component.css']
})
export class WorldStatusComponent implements OnInit {

  worldStatus =  {
    total_cases: 0,
    total_deaths: 0,
    total_recovered: 0,
    new_cases: 0,
    new_deaths: 0
  };

  isLoading = true;

  constructor(private monitorService: CoronaMonitorService) { }

  ngOnInit() {
    this.loadWorldTotalState();
  }

  loadWorldTotalState() {
    this.monitorService.GetWorldTotalState().subscribe(
      (worldStatus) => {
        this.worldStatus = {
          total_cases: Number(worldStatus.total_cases.replace(/,/g,'')),
          total_deaths: Number(worldStatus.total_deaths.replace(/,/g,'')),
          total_recovered: Number(worldStatus.total_recovered.replace(/,/g,'')),
          new_cases: Number(worldStatus.new_cases.replace(/,/g,'')),
          new_deaths: Number(worldStatus.new_deaths.replace(/,/g,''))
        };
                
        this.isLoading = false;
      }
    );
  }

}
