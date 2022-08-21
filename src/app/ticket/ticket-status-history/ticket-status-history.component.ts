import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/core/base/base.component';
import { TicketStatus } from 'src/app/shared/enums/ticket-status.enum';
import { TicketDetailModel } from '../shared/models/ticket-detail.model';
import { TicketService } from '../shared/services/ticket.service';

@Component({
  selector: 'app-ticket-status-history',
  templateUrl: './ticket-status-history.component.html',
  styleUrls: ['./ticket-status-history.component.css']
})
export class TicketStatusHistoryComponent extends BaseComponent implements OnInit {

  TicketStatus = TicketStatus;
  ticket: TicketDetailModel;

  constructor(
    private ticketService: TicketService
  ) {
    super();
  }

  ngOnInit(): void {

    this.ticketService.onTicketChange
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(ticket => {
        this.ticket = ticket;
      });

  }

}
