import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Fix } from '../../_models/fix';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase'
import {combineLatest} from 'rxjs'
import { last, takeLast, mergeAll, map } from 'rxjs/operators'
import * as moment from 'moment';

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
    private afs: AngularFirestore
    ) {
    this.fixesCollection = afs.collection<Fix>('fixes', ref => ref.orderBy('timestamp', 'desc').limit(10));
    this.fixes = this.fixesCollection.valueChanges();
    
   }

  ngOnInit() {
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

