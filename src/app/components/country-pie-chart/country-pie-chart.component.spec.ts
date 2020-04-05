import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryPieChartComponent } from './country-pie-chart.component';

describe('CountryPieChartComponent', () => {
  let component: CountryPieChartComponent;
  let fixture: ComponentFixture<CountryPieChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountryPieChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
