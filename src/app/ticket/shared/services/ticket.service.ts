import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";
import { TicketDetailModel } from "../models/ticket-detail.model";
import { HttpClient, HttpParams } from "@angular/common/http";
import { BaseService } from "src/app/core/base/base.service";

@Injectable()
export class TicketService extends BaseService {

    public onTicketChange: BehaviorSubject<TicketDetailModel> = new BehaviorSubject<TicketDetailModel>(null);

    constructor(
        private httpClient: HttpClient
    ) {
        super("Ticket");
    }

    public getAllPaginated(queryStrings: any) {
        return this.httpClient.get(`${this.baseUrl}/GetAllPaginated`, { params: this.toHttpParams(queryStrings) });
    }

    public post(data: any) {
        return this.httpClient.post(`${this.baseUrl}/Create`, data);
    }


}
