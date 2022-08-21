import { TicketStatus } from "src/app/shared/enums/ticket-status.enum";

export class TicketStatusHistoryModel {

    id: number;
    dateTime: Date;
    status: TicketStatus;

    constructor(args: any) {

        if (args == null) return;

        this.id = args.id;
        this.dateTime = new Date(args.dateTime);
        this.status = args.status;

    }
}