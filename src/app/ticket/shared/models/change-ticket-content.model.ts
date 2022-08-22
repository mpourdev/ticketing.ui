export class ChangeTicketContentModel {

    id: number;
    subject: string;
    message: string;

    constructor(args: any) {

        if (args == null) return;

        this.id = args.id;
        this.subject = args.subject;
        this.message = args.message;

    }
}