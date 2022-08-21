import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketStatusHistoryComponent } from './ticket-status-history.component';

describe('TicketStatusHistoryComponent', () => {
  let component: TicketStatusHistoryComponent;
  let fixture: ComponentFixture<TicketStatusHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketStatusHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketStatusHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
