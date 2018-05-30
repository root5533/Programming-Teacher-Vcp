import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

import { AuthService } from './core/auth.service';
import { VcpDataService } from './services/vcp-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user: any;
  items: FirebaseListObservable<any[]>;
  msgVal = '';
  authenticated: boolean;
  vcpForm: FormGroup;
  messages = [];

  constructor(public auth: AuthService, public data: VcpDataService, private fb: FormBuilder) {
    this.items = this.data.getVcpValues();

    this.vcpForm = fb.group({
      'number': [null, Validators.required],
      'value': [null, Validators.required]
    });

  }

  login() {
    this.auth.googleLogin();
  }

  logout() {
      this.auth.signOut();
  }

  addVcp(vcp): void {
    console.log('vcp form : ', vcp);
    const data = {
      'question': vcp.number,
      'vcp': vcp.value
    };
    this.items.push(data).then(() => {
      console.log('new question added');
      this.messages.push('New vcp value ' + vcp.value + ' added');
      console.log(this.messages);
    });
  }

  updateVcp(vcp, value) {
    // const msg = this.items.remove(vcp.$key).then((res) => {
    //   console.log('res is : ', res);
    // });
    const newVcp = {
      'question': vcp.question,
      'vcp': value
    };
    this.items.update(vcp.$key, newVcp).then(() => {
      console.log('updated');
      this.messages.push('Question ' + vcp.question + ' vcp updated');
    });
  }


}
