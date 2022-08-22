import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { BaseListComponent } from 'src/app/core/base/base-list.component';
import { TicketStatus } from 'src/app/shared/enums/ticket-status.enum';
import { TicketModel } from '../shared/models/ticket.model';
import { TicketService } from '../shared/services/ticket.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent extends BaseListComponent {

  TicketStatus = TicketStatus;
  tickets: TicketModel[];

  constructor(
    private ticketService: TicketService,
    protected router: Router,
    protected route: ActivatedRoute
  ) {
    super(router, route);
  }

  read() {

    this.ticketService.getAllPaginated(this.getParams())
      .pipe(
        takeUntil(this.unsubscribe$),
        this.setPagination(),
        this.updateQueryParams()
      )
      .subscribe((res: any) => {
        this.tickets = res.list.map((o: any) => new TicketModel(o));
      });

  }

}
