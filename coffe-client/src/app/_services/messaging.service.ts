import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { mergeMapTo, map } from 'rxjs/operators';
import { take } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs'
import * as firebase from 'firebase';
import { mergeMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  currentMessage = new BehaviorSubject(null);
  public token = new BehaviorSubject(null);
  public _userCredentials: any;

  constructor(
    private angularFireDB: AngularFirestore,
    private angularFireAuth: AngularFireAuth,
    private angularFireMessaging: AngularFireMessaging,
    public snackBar: MatSnackBar) {
    this.angularFireMessaging.messaging.subscribe(
      (_messaging) => {
        _messaging.onMessage = _messaging.onMessage.bind(_messaging);
        _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
      }
    )
  }
  set userCredentials(userCredentials: firebase.auth.UserCredential) {
    this._userCredentials = userCredentials;
  }

  get userCredentials() {
    return this._userCredentials;
  }

  get isSubscribed() {
    return this.angularFireMessaging.getToken.pipe(map(token => {return token}));
  }

  /**
   * update token in firebase database
   * 
   * @param userId userId as a key 
   * @param token token as a value
   */
  updateToken(userId, token) {
    // we can change this function to request our backend service
    this.angularFireAuth.authState.pipe(take(1)).subscribe(
      () => {
        const data = {};
        data[userId] = token
        console.log(data);
        
        this.angularFireDB.collection('fcmTokens')
          .doc(userId)
          .set({
            userId: token
          })
      })
  }

  /**
   * request permission for notification from firebase cloud messaging
   * 
   * @param userId userId
   */
  requestPermission(userId) {
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        this.token.next(token);
        this.updateToken(userId, token);
      },
      (err) => {
        // Show snack bar error
        this.openSnackBar("Unable to get permission to notify - Try to allow notifications", "ok")
        console.error('Unable to get permission to notify.', err);
      }
    );
  }

  /**
   * hook method when new notification received in foreground
   */
  receiveMessage() {
    this.angularFireMessaging.messages.subscribe(
      (payload) => {
        console.log("new message received. ", payload);
        this.currentMessage.next(payload);
      })
  }


  deleteToken() {
    this.angularFireDB.collection('fcmTokens')
    .doc(this.angularFireAuth.auth.currentUser.uid)
    .delete()
    .then( () => {
      console.log('Delete success')
    })
    .catch((err) => {
      console.error('Could not delete on server: ', err);
    })
  }


  /**
   * Request the removel of local token and fcm token in server
   */
  requestDeleteToken() {
    this.angularFireMessaging.getToken
      .pipe(mergeMap(token => this.angularFireMessaging.deleteToken(token)))
      .subscribe(
        (token) => { 
          // Delete from db by calling delete Token() ???
          console.log('Deleted!'); 
          console.log(token);
          this.deleteToken();
        },
        (err) => {
          console.error('Unable to remove token!', err)
        }
      );
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
}
