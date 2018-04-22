import {} from 'jasmine';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { ChartsModule } from 'ng2-charts';

import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { BallotServiceProvider } from '../providers/ballot-service/ballot-service';
import { ForgetPasswordProvider } from '../providers/forget-password/forget-password';
import { EmployeeAddBallotProvider } from '../providers/employee-add-ballot/employee-add-ballot';

let comp: MyApp;
let fixture: ComponentFixture<MyApp>;

describe('Component: Root Component', () => {

    beforeEach(async(() => {

        TestBed.configureTestingModule({

            declarations: [MyApp],

            providers: [
                StatusBar,
                SplashScreen,
                { provide: ErrorHandler, useClass: IonicErrorHandler },
                AuthServiceProvider,
                BallotServiceProvider,
                ForgetPasswordProvider,
                EmployeeAddBallotProvider
            ],

            imports: [
                BrowserModule,
                HttpModule,
                ChartsModule,
                IonicModule.forRoot(MyApp)
            ]

        }).compileComponents();

    }));

    beforeEach(() => {

        fixture = TestBed.createComponent(MyApp);
        comp = fixture.componentInstance;

    });

    afterEach(() => {
        fixture.destroy();
        comp = null;
    });

    it('is created', () => {

        expect(fixture).toBeTruthy();
        expect(comp).toBeTruthy();

    });

    it('initializes with a root page of LoginPage', () => {
        expect(comp['rootPage']).toBe('LoginPage');
    });

});