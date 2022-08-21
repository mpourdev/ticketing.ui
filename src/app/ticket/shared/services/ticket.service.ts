import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { TicketDetailModel } from "../models/ticket-detail.model";
import { HttpClient } from "@angular/common/http";
import { BaseService } from "src/app/core/base/base.service";
import { ToastrService } from "ngx-toastr";

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

    public post(data: any) {
        return this.httpClient.post(`${this.baseUrl}/Create`, data)
            .pipe(
                this.showSuccessMsg(),
                this.handleError()
            );
    }

    public put(data: any) {
        return this.httpClient.put(`${this.baseUrl}/ChangeContent`, data)
            .pipe(
                this.showSuccessMsg(),
                this.handleError()
            );
    }

    public changeToInProgress(id: number) {
        return this.httpClient.put(`${this.baseUrl}/ChangeToInProgress/${id}`, null)
            .pipe(
                this.showSuccessMsg(),
                this.handleError()
            );
    }

    public changeToResolved(id: number) {
        return this.httpClient.put(`${this.baseUrl}/ChangeToResolved/${id}`, null)
            .pipe(
                this.showSuccessMsg(),
                this.handleError()
            );
    }

}
