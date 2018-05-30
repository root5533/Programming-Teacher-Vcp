import { Injectable } from '@angular/core';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {

  authState: any = null;

  constructor(private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router) {

      this.afAuth.authState.subscribe((auth) => {
        this.authState = auth;
        console.log('authState is : ', this.authState);
      });
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }

  get currentUser(): any {
    return this.authState;
  }

  private socialSignIn(provider): any {
    return this.afAuth.auth.signInWithPopup(provider)
    .then((credential) => {
      this.authState = credential.user;
      // this.updateUserData();
    })
    .catch(error => console.log(error));
  }

  private updateUserData(): void {
    const path = `users/${this.currentUser.uId}`;
    const data = {
      name: this.currentUser.displayName,
      email: this.currentUser.email,
    };
    this.db.object(path).update(data)
    .catch(error => console.log(error));
  }

  githubLogin(): any {
    const provider = new firebase.auth.GithubAuthProvider();
    return this.socialSignIn(provider);
  }

  googleLogin(): any {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.socialSignIn(provider);
  }

  facebookLogin(): any {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.socialSignIn(provider);
  }

  twitterLogin(): any {
    const provider = new firebase.auth.TwitterAuthProvider();
    return this.socialSignIn(provider);
  }

  signOut(): void {
    this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }

  getMessages(): FirebaseListObservable<any[]> {
    return this.db.list('/messages', {
      query: {
        limitToLast: 50
      }
    });
  }

}
