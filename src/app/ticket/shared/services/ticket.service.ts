import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { TicketDetailModel } from "../models/ticket-detail.model";

@Injectable()
export class TicketService {

    public onTicketChange: BehaviorSubject<TicketDetailModel> = new BehaviorSubject<TicketDetailModel>(null);

    constructor() {
    }

}
