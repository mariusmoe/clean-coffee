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
  MatExpansionModule} from '@angular/material';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule }   from '@angular/forms';


import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { environment } from '../environments/environment';
import { HomeComponent, DialogConfirmCleanCoffee } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

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
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
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
