import { TicketStatus } from "src/app/shared/enums/ticket-status.enum";

export class TicketModel {

    id: number;
    firstName: string;
    lastName: string;
    email: string;
    subject: string;
    message: string;
    createdOn: string;
    status: TicketStatus;

    constructor(args: any) {

        if (args == null) return;

        this.id = args.id;
        this.firstName = args.firstName;
        this.lastName = args.lastName;
        this.email = args.email;
        this.subject = args.subject;
        this.message = args.message;
        this.createdOn = args.createdOn;
        this.status = args.status;

    }
}