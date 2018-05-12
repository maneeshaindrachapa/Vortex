import {} from 'jasmine';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement, Component } from '@angular/core';
import { By }           from '@angular/platform-browser';
import { IonicModule, Refresher } from 'ionic-angular';
import { EmployeeHomePage } from './employee-home';
import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HttpModule } from '@angular/http';
import { ChartsModule } from 'ng2-charts';
import { BrowserModule } from '@angular/platform-browser';
import { NavMock, LoadingControllerMock, AuthServiceMock, BallotMock } from '../../mocks';
import { IonicStorageModule } from '@ionic/storage';
import { Storage } from '@ionic/storage';
import { BallotServiceProvider } from '../../providers/ballot-service/ballot-service';

let comp: EmployeeHomePage;
let fixture: ComponentFixture<EmployeeHomePage>;
let de: DebugElement;
let el: HTMLElement;
describe('Page:Employee Home Page', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EmployeeHomePage],
            providers: [
                {provide:AuthServiceProvider,useClass:AuthServiceMock},
                {provide: NavController, useClass: NavMock},
                {provide:AlertController,useClass:LoadingControllerMock},
                {provide:LoadingController,useClass:LoadingControllerMock},
                {provide:BallotServiceProvider,useClass:BallotMock}
            ],
            imports: [
                BrowserModule,
                HttpModule,
                ChartsModule,
                IonicModule.forRoot(EmployeeHomePage),
                IonicStorageModule.forRoot()
            ]
        }).compileComponents();
    }));
 
    beforeEach(() => {
        fixture = TestBed.createComponent(EmployeeHomePage);
        comp    = fixture.componentInstance;
    });
 
    afterEach(() => {
        fixture.destroy();
        comp = null;
        de = null;
        el = null;
    });
 
    it('Employee home page is created', () => {
        expect(fixture).toBeTruthy();
        expect(comp).toBeTruthy();
    });
    
    it('Get Employee Voting Ballots',()=>{
        let temp=fixture.debugElement.injector.get(EmployeeHomePage);
        expect(temp.initializeItems()).toBeTruthy;
    });
    it('Log out user', () => {
        let temp=fixture.debugElement.injector.get(EmployeeHomePage);
        expect(temp.logout()).toBeTruthy;
    });
    it('email keys when user want to see the results', () => {
        let votingballotID='1';
        let temp=fixture.debugElement.injector.get(EmployeeHomePage);
        expect(temp.sendKeys(votingballotID)).toBeTruthy;
    });
    it('Should go to Edit Profile Page', () => {
        let navCtrl = fixture.debugElement.injector.get(NavController);
        spyOn(navCtrl, 'push');
        fixture.detectChanges();
        de = fixture.debugElement.query(By.css('#editProfile'));
        de.triggerEventHandler('click', null);
        expect(navCtrl.push).toHaveBeenCalledWith('EditProfilePage');
    });
    it('Should go to View Results', () => {
        let votingballotID='1';
        let temp=fixture.debugElement.injector.get(EmployeeHomePage);
        expect(temp.viewResults(votingballotID)).toBeTruthy;
    });
    it('Should go to Votings', () => {
        let votingballotID='1';
        let temp=fixture.debugElement.injector.get(EmployeeHomePage);
        expect(temp.vote(votingballotID)).toBeTruthy;
    });
});
