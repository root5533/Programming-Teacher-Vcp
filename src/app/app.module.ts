import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AuthService } from './core/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VcpDataService } from './services/vcp-data.service';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

export const firebaseConfig = {
  apiKey: 'AIzaSyBJ42woKmvN78V7vTSwTYha3Hg_qUJ8lWQ',
  authDomain: 'programming-teacher.firebaseapp.com',
  databaseURL: 'https://programming-teacher.firebaseio.com',
  projectId: 'programming-teacher',
  storageBucket: 'programming-teacher.appspot.com',
  messagingSenderId: '487063878453'
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [
    AuthService,
    VcpDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
