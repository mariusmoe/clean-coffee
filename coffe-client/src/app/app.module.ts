import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, 
  MatCheckboxModule,
  MatToolbarModule,
  MatCardModule,
  MatChipsModule,
  MatTableModule,
  MatDialogModule,
  MatExpansionModule,
  MatSnackBarModule} from '@angular/material';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule }   from '@angular/forms';


import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { environment } from '../environments/environment';
import { HomeComponent, DialogConfirmCleanCoffee } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireAuthModule } from '@angular/fire/auth';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    DialogConfirmCleanCoffee
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatToolbarModule,
    MatCardModule,
    MatChipsModule,
    MatTableModule,
    MatDialogModule,
    MatExpansionModule,
    AngularFireMessagingModule,
    MatSnackBarModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    MatIconModule,
    FormsModule
  ],
  entryComponents: [
    DialogConfirmCleanCoffee
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
