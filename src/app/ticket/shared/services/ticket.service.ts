import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { TicketDetailModel } from "../models/ticket-detail.model";
import { HttpClient } from "@angular/common/http";
import { BaseService } from "src/app/core/base/base.service";
import { ToastrService } from "ngx-toastr";
import { CreateTicketModel } from "../models/create-ticket.model";
import { ChangeTicketContentModel } from "../models/change-ticket-content.model";
import { ChangeTicketContentValidator } from "../validators/change-ticket-content.validator";
import { CreateTicketValidator } from "../validators/create-ticket.validator";

@Injectable()
export class TicketService extends BaseService {

    public onTicketChange: BehaviorSubject<TicketDetailModel> = new BehaviorSubject<TicketDetailModel>(null);

    constructor(
        private httpClient: HttpClient,
        toastrService: ToastrService
    ) {
        super("Ticket", toastrService);
    }

    public getAllPaginated(queryStrings: any) {
        return this.httpClient.get(`${this.baseUrl}/GetAllPaginated`, { params: this.toHttpParams(queryStrings) })
            .pipe(
                this.handleError()
            );
    }

    public getById(id: number) {
        return this.httpClient.get(`${this.baseUrl}/GetById/${id}`)
            .pipe(
                this.handleError()
            );
    }

    public post(createTicket: CreateTicketModel,) {

        this.checkValidationAndThrowError(CreateTicketValidator, createTicket);

        return this.httpClient.post(`${this.baseUrl}/Create`, createTicket)
            .pipe(
                this.showSuccessMsg(),
                this.handleError()
            );
    }

    public put(changeContent: ChangeTicketContentModel) {

        this.checkValidationAndThrowError(ChangeTicketContentValidator, changeContent);

        return this.httpClient.put(`${this.baseUrl}/ChangeContent`, changeContent)
            .pipe(
                this.showSuccessMsg(),
                this.handleError()
            );
    }

    public changeToInProgress(id: number) {

        if (id <= 0)
            throw new Error('The id must be greater than 0.');

        return this.httpClient.patch(`${this.baseUrl}/ChangeToInProgress/${id}`, null)
            .pipe(
                this.showSuccessMsg(),
                this.handleError()
            );
    }

    public changeToResolved(id: number) {

        if (id <= 0)
            throw new Error('The id must be greater than 0.');

        return this.httpClient.patch(`${this.baseUrl}/ChangeToResolved/${id}`, null)
            .pipe(
                this.showSuccessMsg(),
                this.handleError()
            );
    }

}
