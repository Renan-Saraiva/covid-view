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
        this.worldStatus = worldStatus;
        this.isLoading = false;
      }
    );
  }

}
