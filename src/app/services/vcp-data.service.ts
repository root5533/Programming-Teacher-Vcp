import { Injectable } from '@angular/core';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Injectable()
export class VcpDataService {

  constructor( private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router ) { }

  getVcpValues(): any {
    return this.db.list('/vcp/values', {
      query: {
        limitToFirst: 100
      }
    });
  }

  getObject(key: string): any {
    return this.db.object('/' + key);
  }

}
