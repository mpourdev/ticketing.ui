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

    public getById(id: number) {
        return this.httpClient.get(`${this.baseUrl}/GetById/${id}`);
    }

    public post(data: any) {
        return this.httpClient.post(`${this.baseUrl}/Create`, data);
    }

    public put(data: any) {
        return this.httpClient.put(`${this.baseUrl}/ChangeContent`, data);
    }

    public changeToInProgress(id: number) {
        return this.httpClient.put(`${this.baseUrl}/changeToInProgress/${id}`, null);
    }

    public changeToResolved(id: number) {
        return this.httpClient.put(`${this.baseUrl}/changeToResolved/${id}`, null);
    }

}
