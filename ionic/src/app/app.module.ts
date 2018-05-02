import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { ChartsModule } from 'ng2-charts';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { BallotServiceProvider } from '../providers/ballot-service/ballot-service';
import { ForgetPasswordProvider } from '../providers/forget-password/forget-password';
import { EmployeeAddBallotProvider } from '../providers/employee-add-ballot/employee-add-ballot';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ChartsModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    BallotServiceProvider,
    ForgetPasswordProvider,
    EmployeeAddBallotProvider
  ]
})
export class AppModule {}
