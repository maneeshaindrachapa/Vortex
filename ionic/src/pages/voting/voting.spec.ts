import {} from 'jasmine';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement, Component } from '@angular/core';
import { By }           from '@angular/platform-browser';
import { IonicModule } from 'ionic-angular';
import { MyApp } from '../../app/app.component';
import { VotingPage } from './voting';
import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { BallotServiceProvider } from '../../providers/ballot-service/ballot-service';
import { HttpModule } from '@angular/http';
import { ChartsModule } from 'ng2-charts';
import { BrowserModule } from '@angular/platform-browser';
import { NavMock, LoadingControllerMock, AuthServiceMock, BallotMock } from '../../mocks';
import { IonicStorageModule } from '@ionic/storage';

let comp: VotingPage;
let fixture: ComponentFixture<VotingPage>;
let de: DebugElement;
let el: HTMLElement;
describe('Page:Votings Page', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MyApp, VotingPage],
            providers: [
                {provide: NavController, useClass: NavMock},
                {provide:AlertController,useClass:LoadingControllerMock},
                {provide:LoadingController,useClass:LoadingControllerMock},
                {provide:BallotServiceProvider,useClass:BallotMock}
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
        fixture = TestBed.createComponent(VotingPage);
        comp    = fixture.componentInstance;
    });
 
    afterEach(() => {
        fixture.destroy();
        comp = null;
        de = null;
        el = null;
    });

    it('Voting page is created', () => {
        expect(fixture).toBeTruthy();
        expect(comp).toBeTruthy();
    });

    it("vote Function test", function(){
        let temp=fixture.debugElement.injector.get(VotingPage);
        expect(temp.makeVote()).toBeTruthy; 
    });

    it('Help view in contaact us page',()=>{
        let temp=fixture.debugElement.injector.get(VotingPage);
        fixture.detectChanges();
        de = fixture.debugElement.query(By.css('#help'));
        de.triggerEventHandler('click', null);
        expect(temp.help()).toBeTruthy;
    });

});