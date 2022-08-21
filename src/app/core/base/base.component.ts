import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable()
export abstract class BaseComponent implements OnDestroy {

    public unsubscribe$ = new Subject<void>();

    public ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    public unsubscribe() {
        return takeUntil<any>(this.unsubscribe$);
    }
}