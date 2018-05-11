import {} from 'jasmine';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement, Component } from '@angular/core';
import { By }           from '@angular/platform-browser';
import { IonicModule } from 'ionic-angular';
import { CreateVotingBallotPage } from './create-voting-ballot';
import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HttpModule } from '@angular/http';
import { ChartsModule } from 'ng2-charts';
import { BrowserModule } from '@angular/platform-browser';
import { NavMock, LoadingControllerMock, AuthServiceMock, BallotMock } from '../../mocks';
import { IonicStorageModule } from '@ionic/storage';
import { Storage } from '@ionic/storage';
import { BallotServiceProvider } from '../../providers/ballot-service/ballot-service';

let comp: CreateVotingBallotPage;
let fixture: ComponentFixture<CreateVotingBallotPage>;
let de: DebugElement;
let el: HTMLElement;
describe('Page:Create Voting Ballot Page', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CreateVotingBallotPage],
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
                IonicModule.forRoot(CreateVotingBallotPage),
                IonicStorageModule.forRoot()
            ]
        }).compileComponents();
    }));
 
    beforeEach(() => {
        fixture = TestBed.createComponent(CreateVotingBallotPage);
        comp    = fixture.componentInstance;
    });
 
    afterEach(() => {
        fixture.destroy();
        comp = null;
        de = null;
        el = null;
    });
 
    it('Create Voting Ballot page is created', () => {
        expect(fixture).toBeTruthy();
        expect(comp).toBeTruthy();
    });
    
    it('Create a Voting Ballot',()=>{
        let temp=fixture.debugElement.injector.get(CreateVotingBallotPage);
        expect(temp.createBallot()).toBeTruthy;
    });

});
