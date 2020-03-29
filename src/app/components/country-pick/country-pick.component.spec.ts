import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryPickComponent } from './country-pick.component';

describe('CountryPickComponent', () => {
  let component: CountryPickComponent;
  let fixture: ComponentFixture<CountryPickComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountryPickComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryPickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
