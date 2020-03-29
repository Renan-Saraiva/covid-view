import { Component } from '@angular/core';
import { CoronaMonitorService } from './services/corona-monitor.service';
import { WorldTotalState } from './models/world-total-state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'covid-view';

  worldStatus: WorldTotalState;

  constructor(private coronaMonitor: CoronaMonitorService) {    
    coronaMonitor.GetWorldTotalState().subscribe(
      (response) => this.worldStatus = response
    );        
  }
}
