export class CreateTicketModel {

    firstName: string;
    lastName: string;
    email: string;
    subject: string;
    message: string;

    constructor(args: any) {

        if (args == null) return;

        this.firstName = args.firstName;
        this.lastName = args.lastName;
        this.email = args.email;
        this.subject = args.subject;
        this.message = args.message;

    }
}