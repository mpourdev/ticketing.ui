import { Validator } from "fluentvalidation-ts";
import { ChangeTicketContentModel } from "../models/change-ticket-content.model";

export class ChangeTicketContentValidator extends Validator<ChangeTicketContentModel> {

    constructor() {
        super();

        this.ruleFor('id')
            .notNull()
            .withMessage('The id can not be null.')
            .greaterThan(0)
            .withMessage('The id must be greater than 0.');

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