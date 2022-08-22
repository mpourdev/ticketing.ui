import { HttpErrorResponse, HttpParams } from "@angular/common/http";
import { MonoTypeOperatorFunction, OperatorFunction, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { StatusCodes } from "../constants/app.const";
import { ToastrService } from "ngx-toastr";
import { SyncValidator } from "fluentvalidation-ts/dist/CoreValidator";

export abstract class BaseService {

    protected readonly successMsg: string = "Successfully Done!";
    protected readonly errorMsg: string = "Sorry we could not complete your request.";

    protected readonly endpoint: string = environment.endpoint;
    protected readonly baseUrl: string;

    constructor(path: string, private toastrService: ToastrService) {
        this.baseUrl = `${this.endpoint}/${path}`;
    }

    protected toHttpParams(queryStrings: any): HttpParams {
        if (!queryStrings) return null;

        let params = new HttpParams();

        Object.keys(queryStrings).forEach(prop => {
            params = params.append(prop, queryStrings[prop]);
        });

        return params;
    }

    protected handleError(): OperatorFunction<unknown, unknown> {

        return catchError((err: HttpErrorResponse) => {
            switch (err.status) {
                case StatusCodes.GeneralException:
                case StatusCodes.NotFoundException:
                case StatusCodes.DuplicateException:
                    this.toastrService.error(err.error, 'Error!');
                    break;
                case StatusCodes.InternalServerError:
                    this.toastrService.error(this.errorMsg, 'Error!');
                    break;
                case StatusCodes.BadRequest:
                    if (err.error.errors) {
                        let errors = Object.keys(err.error.errors).map(key => err.error.errors[key]);
                        errors.forEach(err => this.toastrService.error(err, 'Error!'));
                    }
                    else {
                        this.toastrService.error(err.error, 'Error!');
                    }
                    break;
                default:
                    this.toastrService.error(err.error, 'Error!');
                    break;
            }

            return throwError(err);
        });

    }

    protected showSuccessMsg(): MonoTypeOperatorFunction<unknown> {
        return tap(() => this.toastrService.success(this.successMsg))
    }

    checkValidationAndThrowError<TModel>(validatorType: { new(): SyncValidator<TModel> }, model: TModel) {
        const validator = new validatorType();
        let validationErrors: any = validator.validate(model);

        if (Object.keys(validationErrors).length) {
            let errors = Object.keys(validationErrors).map(key => validationErrors[key]);
            errors.forEach(err => this.toastrService.error(err, 'Validation Error!'));
            console.error(validationErrors);
            throw new Error('Validation Error');
        }
    }

}