import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FirestoreModule, getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from "../environments/environment";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { HomeComponent } from './home/home.component';
import { FirstViewComponent } from './first-view/first-view.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FirstViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FirestoreModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
