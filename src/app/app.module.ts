import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import{HttpClientModule} from'@angular/common/http'
import { NgxSpinnerModule } from "ngx-spinner";
import { AuthService } from './services/auth.service';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';

import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule,
     BrowserAnimationsModule, // storage,
    HttpClientModule,
    NgxSpinnerModule,
  
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
