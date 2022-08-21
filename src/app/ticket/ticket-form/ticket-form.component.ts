import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/core/base/base.component';
import { formValidator } from 'src/app/shared/utilities/form.utility';
import { TicketService } from '../shared/services/ticket.service';

@Component({
  selector: 'app-ticket-form',
  templateUrl: './ticket-form.component.html',
  styleUrls: ['./ticket-form.component.css']
})
export class TicketFormComponent extends BaseComponent implements OnInit {

  ticketForm = new FormGroup({
    firstName: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
    lastName: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
    email: new FormControl(null, [Validators.required, Validators.email, Validators.maxLength(50)]),
    subject: new FormControl(null, [Validators.required, Validators.maxLength(200)]),
    message: new FormControl(null, [Validators.required, Validators.maxLength(1000)]),
  });

  constructor(
    private ticketService: TicketService,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
  }

  submit() {

    if (formValidator(this.ticketForm)) {

      let formData = this.ticketForm.getRawValue();

      this.ticketService.post(formData)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(() => {
          this.router.navigate(['ticket/list']);
        });
    }

  }

}
