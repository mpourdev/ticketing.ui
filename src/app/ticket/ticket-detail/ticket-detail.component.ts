import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/core/base/base.component';
import { TicketStatus } from 'src/app/shared/enums/ticket-status.enum';
import { formValidator } from 'src/app/shared/utilities/form.utility';
import { TicketDetailModel } from '../shared/models/ticket-detail.model';
import { TicketService } from '../shared/services/ticket.service';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.css']
})
export class TicketDetailComponent extends BaseComponent implements OnInit {

  TicketStatus = TicketStatus;

  ticketId: number;
  ticket: TicketDetailModel = new TicketDetailModel(null);

  subjectControl = new FormControl(null, [Validators.required, Validators.maxLength(200)]);
  messageControl = new FormControl(null, [Validators.required, Validators.maxLength(1000)]);

  ticketForm = new FormGroup({
    firstName: new FormControl({ value: null, disabled: true }),
    lastName: new FormControl({ value: null, disabled: true }),
    email: new FormControl({ value: null, disabled: true }),
    subject: this.subjectControl,
    message: this.messageControl,
  });


  constructor(
    private ticketService: TicketService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {

    this.route.params
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(params => {
        this.ticketId = parseInt(params.id);
      });

    this.read();

  }

  read() {

    this.ticketService.getById(this.ticketId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res: any) => {
        this.ticket = new TicketDetailModel(res);
        this.ticketService.onTicketChange.next(this.ticket);

        this.ticketForm.patchValue(this.ticket);

        if (this.ticket.status === TicketStatus.Opened) {
          this.subjectControl.enable();
          this.messageControl.enable();
        }
        else {
          this.subjectControl.disable();
          this.messageControl.disable();
        }

      });

  }

  edit() {

    if (this.ticket.status !== TicketStatus.Opened)
      return;

    if (formValidator(this.ticketForm)) {

      let formData = this.ticketForm.getRawValue();
      formData.id = this.ticketId;

      this.ticketService.put(formData)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(() => {
          this.router.navigate(['ticket/list']);
        });
    }

  }

  changeToInProgress() {

    if (this.ticket.status !== TicketStatus.Opened)
      return;

    this.ticketService.changeToInProgress(this.ticketId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.router.navigate(['ticket/list']);
      });
  }

  changeToResolved() {

    if (this.ticket.status !== TicketStatus.InProgress)
      return;

    this.ticketService.changeToResolved(this.ticketId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.router.navigate(['ticket/list']);
      });

  }

}
