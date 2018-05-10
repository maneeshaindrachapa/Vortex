import {} from 'jasmine';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement, Component } from '@angular/core';
import { By }           from '@angular/platform-browser';
import { IonicModule } from 'ionic-angular';
import { MyApp } from '../../app/app.component';
import { SignUpPage } from './sign-up';
import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HttpModule } from '@angular/http';
import { ChartsModule } from 'ng2-charts';
import { BrowserModule } from '@angular/platform-browser';
import { NavMock, LoadingControllerMock, AuthServiceMock } from '../../mocks';
import { IonicStorageModule } from '@ionic/storage';

let comp: SignUpPage;
let fixture: ComponentFixture<SignUpPage>;
let de: DebugElement;
let el: HTMLElement;
describe('Page:SignUp Page', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MyApp, SignUpPage],
            providers: [
                {provide:AuthServiceProvider,useClass:AuthServiceMock},
                {provide: NavController, useClass: NavMock},
                {provide:AlertController,useClass:LoadingControllerMock},
                {provide:LoadingController,useClass:LoadingControllerMock}
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
        fixture = TestBed.createComponent(SignUpPage);
        comp    = fixture.componentInstance;
    });
 
    afterEach(() => {
        fixture.destroy();
        comp = null;
        de = null;
        el = null;
    });

    it('SignUp page is created', () => {
        expect(fixture).toBeTruthy();
        expect(comp).toBeTruthy();
    });

    it("Register Function test", function(){
        let signFunc=fixture.debugElement.injector.get(SignUpPage);
        expect(signFunc.register()).toBeTruthy; 
    });

    it("Organizations Loading Function test", function(){
        let signFunc=fixture.debugElement.injector.get(SignUpPage);
        expect(signFunc.loadOrganization()).toBeTruthy;   
    });

    it("Show Alert Function test", function(){
        let alert= fixture.debugElement.injector.get(AlertController);
        spyOn(alert, 'create');
        fixture.detectChanges();

        //de = fixture.debugElement.query(By.css('.submit-btn'));
        //de.triggerEventHandler('click', null);
        expect(alert.create({title: 'title',subTitle: "sub-title",buttons: ['OK']})).toBeTruthy;
    });
});