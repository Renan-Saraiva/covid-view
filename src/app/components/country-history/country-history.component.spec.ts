import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryHistoryComponent } from './country-history.component';

describe('CountryHistoryComponent', () => {
  let component: CountryHistoryComponent;
  let fixture: ComponentFixture<CountryHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountryHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
