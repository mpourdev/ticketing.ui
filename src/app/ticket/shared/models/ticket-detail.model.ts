import { TicketStatus } from "src/app/shared/enums/ticket-status.enum";
import { TicketStatusHistoryModel } from "./ticket-status-history.model";

export class TicketDetailModel {

    id: number;
    firstName: string;
    lastName: string;
    email: string;
    subject: string;
    message: string;
    createdOn: string;
    status: TicketStatus;

    ticketStatusHistories: TicketStatusHistoryModel[];

    constructor(args: any) {

        this.ticketStatusHistories = [];

        if (args == null) return;

        this.id = args.id;
        this.firstName = args.firstName;
        this.lastName = args.lastName;
        this.email = args.email;
        this.subject = args.subject;
        this.message = args.message;
        this.createdOn = args.createdOn;
        this.status = args.status;
        this.ticketStatusHistories = args.ticketStatusHistories.map((res: any) => new TicketStatusHistoryModel(res));
    }

    get fullName(): string {
        return `${this.firstName} ${this.lastName}`
    }
}