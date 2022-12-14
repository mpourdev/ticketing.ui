import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketRoutingModule } from './ticket-routing.module';
import { TicketComponent } from './ticket.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketFormComponent } from './ticket-form/ticket-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TicketService } from './shared/services/ticket.service';
import { PaginationModule } from '../shared/components/pagination/pagination.module';
import { TicketDetailComponent } from './ticket-detail/ticket-detail.component';
import { TicketStatusHistoryComponent } from './ticket-status-history/ticket-status-history.component';


@NgModule({
  declarations: [
    TicketComponent,
    TicketListComponent,
    TicketFormComponent,
    TicketDetailComponent,
    TicketStatusHistoryComponent
  ],
  imports: [
    CommonModule,
    TicketRoutingModule,
    ReactiveFormsModule,
    PaginationModule
  ],
  providers: [
    TicketService
  ]
})
export class TicketModule { }
