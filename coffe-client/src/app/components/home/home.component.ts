import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Fix } from '../../_models/fix';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase'
import {combineLatest} from 'rxjs'
import { last, takeLast, mergeAll, map } from 'rxjs/operators'
import * as moment from 'moment';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


export interface FixId extends Fix { id: string; }



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private fixesCollection: AngularFirestoreCollection<Fix>;
  fixes: Observable<Fix[]>;
  lastFix: Observable<FixId[]>
  hiddenFixHistory = true;
  theLast;


  constructor(
    private afs: AngularFirestore,
    public dialog: MatDialog
    ) {
    this.fixesCollection = afs.collection<Fix>('fixes', ref => ref.orderBy('timestamp', 'desc').limit(10));
    this.fixes = this.fixesCollection.valueChanges();
    
   }

  ngOnInit() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogConfirmCleanCoffee, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      
      // this.animal = result;
      // addFix();
    });
  }

  addFix() {
    let fixToAdd: Fix = {
      timestamp: new Date().getTime()
    }
    this.fixesCollection.add(fixToAdd)
    .catch(err => { console.log(err);
    });
    
  }

  toggleHiddenFixHistory() {
    this.hiddenFixHistory = !this.hiddenFixHistory;
  }

  isOld(timestamp) {
    const now = moment();
    const lastFix = moment(timestamp);
    if (now.diff(lastFix, 'weeks') < 1) {
      return true;
    }  
    return false;
  }

  timeSince(timestamp) {
    const now = moment();
    const lastFix = moment(timestamp);
    return now.diff(lastFix, 'days')
  }

}

@Component({
  selector: 'dialog-confirm-clean-coffee',
  templateUrl: 'dialog-confirm-clean-coffee.html',
})
export class DialogConfirmCleanCoffee {

  constructor(public dialogRef: MatDialogRef<DialogConfirmCleanCoffee>) {}

  onYesClick(): void {
    this.dialogRef.close(true);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

