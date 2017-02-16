import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
@Injectable()
export class SharedService {
    // Observable string sources
    private emitChangeSource = new Subject<any>();
    // Observable string streams
    public changeEmitted$ = this.emitChangeSource.asObservable();
    // Service message commands
    public emitChange(change: any) {
        this.emitChangeSource.next(change);
    }
}