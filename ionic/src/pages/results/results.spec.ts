import {} from 'jasmine';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement, Component } from '@angular/core';
import { By }           from '@angular/platform-browser';
import { IonicModule } from 'ionic-angular';
import { MyApp } from '../../app/app.component';
/*import { ResultsPage } from './results';
import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { ChartsModule } from 'ng2-charts';
import { BrowserModule } from '@angular/platform-browser';
import { NavMock, LoadingControllerMock, ForgetPasswordMock, BallotMock } from '../../mocks';
import { BallotServiceProvider } from '../../providers/ballot-service/ballot-service';
import { Chart } from 'chart.js';

let comp: ResultsPage;
let fixture: ComponentFixture<ResultsPage>;
let de: DebugElement;
let el: HTMLElement;

describe('Page: Results Page', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MyApp, ResultsPage],
            providers: [
                ChartsModule,
                {provide:BallotServiceProvider,useClass:BallotMock},
                {provide: NavController, useClass: NavMock},
                {provide:AlertController,useClass:LoadingControllerMock},
                {provide:LoadingController,useClass:LoadingControllerMock}
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
        fixture = TestBed.createComponent(ResultsPage);
        comp    = fixture.componentInstance;
    });
 
    afterEach(() => {
        fixture.destroy();
        comp = null;
        de = null;
        el = null;
    });
    
    it('Results page is created', () => {
        expect(fixture).toBeTruthy();
        expect(comp).toBeTruthy();
    });

    it("Get options of the ballot", function(){
        let temp = fixture.debugElement.injector.get(ResultsPage);
        expect(temp.getOptions()).toBeTruthy;
    });

    it("Get Results ", function(){
        let temp = fixture.debugElement.injector.get(ResultsPage);
        temp.options=[{votingballotID:1,votingoptionID:1,votingoptionName:'example 1'}];
        expect(temp.getResults(this.options)).toBeTruthy;
    });

});*/