import { Validator } from "fluentvalidation-ts";
import { CreateTicketModel } from "../models/create-ticket.model";

export class CreateTicketValidator extends Validator<CreateTicketModel> {

    constructor() {
        super();

        this.ruleFor('firstName')
            .notEmpty()
            .withMessage('Please enter your "First Name".')
            .notNull()
            .withMessage('Please enter your "First Name".')
            .maxLength(50)
            .withMessage('The length of "First Name" must be 50 characters or fewer.');

        this.ruleFor('lastName')
            .notEmpty()
            .withMessage('Please enter your "Last Name".')
            .notNull()
            .withMessage('Please enter your "Last Name".')
            .maxLength(50)
            .withMessage('The length of "Last Name" must be 50 characters or fewer.');

        this.ruleFor('email')
            .notEmpty()
            .withMessage('Please enter your "Email".')
            .notNull()
            .withMessage('Please enter your "Email".')
            .maxLength(50)
            .withMessage('The length of "Email" must be 50 characters or fewer.')
            .emailAddress()
            .withMessage('The Email Address is invalid.');

        this.ruleFor('subject')
            .notEmpty()
            .withMessage('Please enter your "Subject".')
            .notNull()
            .withMessage('Please enter your "Subject".')
            .maxLength(200)
            .withMessage('The length of "Subject" must be 200 characters or fewer.');

        this.ruleFor('message')
            .notEmpty()
            .withMessage('Please enter your "Message".')
            .notNull()
            .withMessage('Please enter your "Message".')
            .maxLength(1000)
            .withMessage('The length of "Message" must be 1000 characters or fewer.');
    }

}