import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightBookedComponent } from './flight-booked.component';

describe('FlightBookedComponent', () => {
  let component: FlightBookedComponent;
  let fixture: ComponentFixture<FlightBookedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightBookedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightBookedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
