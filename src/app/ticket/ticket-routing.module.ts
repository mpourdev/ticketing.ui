import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketFormComponent } from './ticket-form/ticket-form.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketComponent } from './ticket.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list'
  },
  {
    path: '',
    component: TicketComponent,
    children: [
      {
        path: 'list',
        component: TicketListComponent
      },
      {
        path: 'form/:id',
        component: TicketFormComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketRoutingModule { }
