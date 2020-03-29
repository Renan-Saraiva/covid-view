import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldStatusComponent } from './world-status.component';

describe('WorldStatusComponent', () => {
  let component: WorldStatusComponent;
  let fixture: ComponentFixture<WorldStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorldStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorldStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
