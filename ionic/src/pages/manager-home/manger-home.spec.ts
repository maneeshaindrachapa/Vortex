import {} from 'jasmine';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement, Component } from '@angular/core';
import { By }           from '@angular/platform-browser';
import { IonicModule, MenuController } from 'ionic-angular';
import { MyApp } from '../../app/app.component';
import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HttpModule } from '@angular/http';
import { ChartsModule } from 'ng2-charts';
import { BrowserModule } from '@angular/platform-browser';
import { ManagerHomePage } from './manager-home';
import { NavMock, AuthServiceMock, LoadingControllerMock, EmpAddBallotMock, BallotMock, MenuMock } from '../../mocks';
import { IonicStorageModule } from '@ionic/storage';
import { EmployeeAddBallotProvider } from '../../providers/employee-add-ballot/employee-add-ballot';
import { BallotServiceProvider } from '../../providers/ballot-service/ballot-service';

let comp: ManagerHomePage;
let fixture: ComponentFixture<ManagerHomePage>;
let de: DebugElement;
let el: HTMLElement;
describe('Page:Manager Home Page', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MyApp, ManagerHomePage],
            providers: [
                {provide:AuthServiceProvider,useClass:AuthServiceMock},
                {provide:EmployeeAddBallotProvider,useClass:EmpAddBallotMock},
                {provide:BallotServiceProvider,useClass:BallotMock},
                {provide: NavController, useClass: NavMock},
                {provide:AlertController,useClass:LoadingControllerMock},
                {provide:LoadingController,useClass:LoadingControllerMock},
                {provide: MenuController, useClass:MenuMock}
            ],
            imports: [
                BrowserModule,
                HttpModule,
                ChartsModule,
                IonicModule.forRoot(MyApp),
                IonicStorageModule.forRoot()
            ]
        }).compileComponents();
    }));
 
    beforeEach(() => {
        fixture = TestBed.createComponent(ManagerHomePage);
        comp    = fixture.componentInstance;
    });
 
    afterEach(() => {
        fixture.destroy();
        comp = null;
        de = null;
        el = null;
    });
 
    it('Manager Home page is created', () => {
        expect(fixture).toBeTruthy();
        expect(comp).toBeTruthy();
    });
    it('Voting Ballots Loading test', () => {
        let temp = fixture.debugElement.injector.get(ManagerHomePage);
        expect(temp.initializeItems()).toBeTruthy;
    }); 
    it('Log out user', () => {
        let temp=fixture.debugElement.injector.get(ManagerHomePage);
        expect(temp.logout()).toBeTruthy;
    });
    it('Should go to Add Employee Page to the voting ballot', () => {
        let votingballotid='1';
        let organizationid='1';
        let temp=fixture.debugElement.injector.get(ManagerHomePage);
        expect(temp.addEmployee(votingballotid,organizationid)).toBeTruthy;
    });  

    it('Should go to see the results', () => {
        let votingballotid='1';
        let temp=fixture.debugElement.injector.get(ManagerHomePage);
        expect(temp.viewResults(votingballotid)).toBeTruthy;
    });

    it('Should remove a voting ballot', () => {
        let votingballotid='1';
        let temp=fixture.debugElement.injector.get(ManagerHomePage);
        expect(temp.remove(votingballotid)).toBeTruthy;
    });

    it('Should Open the Menu', () => {
        let temp=fixture.debugElement.injector.get(ManagerHomePage);
        expect(temp.openMenu()).toBeTruthy;
    });
    
});
