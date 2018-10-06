import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService { 


  constructor( private afAuth: AngularFireAuth ) { }

    login():Promise<auth.UserCredential> {
      return this.afAuth.auth.signInAnonymously();
    }
    logout() {
      this.afAuth.auth.signOut();
    }
}
