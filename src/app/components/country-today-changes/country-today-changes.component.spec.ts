import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryTodayChangesComponent } from './country-today-changes.component';

describe('CountryTodayChangesComponent', () => {
  let component: CountryTodayChangesComponent;
  let fixture: ComponentFixture<CountryTodayChangesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountryTodayChangesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryTodayChangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
