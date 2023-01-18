import { AppMaterialModule } from './app-material/app-material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TopNavComponent } from './shared/components/top-nav/top-nav.component';
import { NavigationComponent } from './shared/components/navigation/navigation.component';
import { TokenInterceptor } from './shared/interceptors';
import { UsersModule } from './modules/users/users.module';
import { SharedModule } from './shared/shared.module';
import { environment } from '../environments/environment';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FirebaseMessagingService } from './shared/services';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    TopNavComponent,
    NavigationComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    UsersModule,
    SharedModule,

    AngularFireDatabaseModule,
      AngularFireAuthModule,
      AngularFireMessagingModule,
      AngularFireModule.initializeApp(environment.firebase),
      ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),


  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide:FirebaseMessagingService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
