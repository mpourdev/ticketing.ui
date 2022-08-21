import { Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { BaseComponent } from './base.component';

@Injectable()
export abstract class BaseListComponent extends BaseComponent implements OnInit {

    total: number = 0;
    pageIndex: number = 0;
    pageSize: number = 10;
    sort: string;

    constructor(
        protected router: Router,
        protected route: ActivatedRoute
    ) {
        super();
    }

    ngOnInit(): void {
        this.initiateFromQueryParams();
    }

    abstract read(): void;

    initiateFromQueryParams(): void {
        var params = this.route.snapshot.queryParams;
        this.pageIndex = params.pageIndex || this.pageIndex;
        this.pageSize = params.pageSize || this.pageSize;
        this.sort = params.sort || this.sort;
        this.read();
    }

    getParams(): any {
        let params: any = {};

        params["pageIndex"] = this.pageIndex;
        params["pageSize"] = this.pageSize;
        if (this.sort) params["sort"] = this.sort;

        return params;
    }

    onPageSizeChanged(pageSize: number) {
        this.pageSize = pageSize;
        this.pageIndex = 0;
        this.read();
    }

    onPageChanged(pageIndex: number) {
        this.pageIndex = pageIndex;
        this.read();
    }

    getIndex(i: number) {
        return i + 1 + (this.pageIndex * this.pageSize)
    }

    updateQueryParams() {
        return tap(() => {
            let params = this.getParams();
            this.router.navigate([], { queryParams: params });
        });
    }

    setPagination() {
        return tap((res: any) => {
            this.total = res.total;
            this.pageIndex = res.pageIndex;
            this.pageSize = res.pageSize;
        });
    }
}