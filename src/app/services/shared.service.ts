import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SharedService {

  public dataMap: Map<any, any>;
  public sharedUserData$: Subject<any>;

  constructor() {
    this.sharedUserData$ = new Subject();
    this.dataMap = new Map();
    // this.dataMap.set('test', 'data');
    // console.log(this.dataMap)
  }


  // Service message commands
  updateUserData(key, value) {
    console.log('old map', this.dataMap);

    this.dataMap.set(key, value);

    console.log('updating', this.dataMap);
    this.sharedUserData$.next(this.dataMap);
  }
}
