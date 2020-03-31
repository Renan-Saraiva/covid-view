import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCountriesTableComponent } from './all-countries-table.component';

describe('AllCountriesTableComponent', () => {
  let component: AllCountriesTableComponent;
  let fixture: ComponentFixture<AllCountriesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllCountriesTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCountriesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
