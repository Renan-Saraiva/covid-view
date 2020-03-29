import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopAffectedCountriesComponent } from './top-affected-countries.component';

describe('TopAffectedCountriesComponent', () => {
  let component: TopAffectedCountriesComponent;
  let fixture: ComponentFixture<TopAffectedCountriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopAffectedCountriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopAffectedCountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
