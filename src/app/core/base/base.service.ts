import { HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";

export abstract class BaseService {

    protected readonly endpoint: string = environment.endpoint;
    protected readonly baseUrl: string;

    constructor(path: string) {
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

}