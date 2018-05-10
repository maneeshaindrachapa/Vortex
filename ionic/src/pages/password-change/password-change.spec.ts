import {} from 'jasmine';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement, Component } from '@angular/core';
import { By }           from '@angular/platform-browser';
import { IonicModule } from 'ionic-angular';
import { MyApp } from '../../app/app.component';
import { PasswordChangePage } from './password-change';
import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { ForgetPasswordProvider } from '../../providers/forget-password/forget-password';
import { HttpModule } from '@angular/http';
import { ChartsModule } from 'ng2-charts';
import { BrowserModule } from '@angular/platform-browser';
import { NavMock, LoadingControllerMock, ForgetPasswordMock } from '../../mocks';

let comp: PasswordChangePage;
let fixture: ComponentFixture<PasswordChangePage>;
let de: DebugElement;
let el: HTMLElement;
describe('Page: PasswordChange Page', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MyApp, PasswordChangePage],
            providers: [
                {provide:ForgetPasswordProvider,useClass:ForgetPasswordMock},
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
        fixture = TestBed.createComponent(PasswordChangePage);
        comp    = fixture.componentInstance;
    });
 
    afterEach(() => {
        fixture.destroy();
        comp = null;
        de = null;
        el = null;
    });

    it('PasswordChange page is created', () => {
        expect(fixture).toBeTruthy();
        expect(comp).toBeTruthy();
    });

    it("CheckCode Function test for correct code", function(){
        let passwordCG = fixture.debugElement.injector.get(PasswordChangePage);
        passwordCG.code=12312323;
        expect(passwordCG.checkCode()).toBeTruthy;
    });

    it("CheckCode Function test for empty code", function(){
        let passwordCG = fixture.debugElement.injector.get(PasswordChangePage);
        expect(passwordCG.checkCode()).toBeTruthy;
    });

    it("Change password Function test for empty password", function(){
        let passwordCG = fixture.debugElement.injector.get(PasswordChangePage);
        expect(passwordCG.changePassword()).toBeTruthy;    
    });
    it("Change password Function test for correct password", function(){
        let passwordCG = fixture.debugElement.injector.get(PasswordChangePage);
        passwordCG.password="123123123";
        expect(passwordCG.changePassword()).toBeTruthy;    
    });
    //loading method
    it("Loading Function test", function(){
        let loading = fixture.debugElement.injector.get(LoadingController);
        spyOn(loading, 'create');
        fixture.detectChanges();

        expect(loading.create({content: 'Please wait...',dismissOnPageChange: true})).toBeTruthy;
    });
    //Show Error Method
    it("Show Error Function test", function(){
        let alert= fixture.debugElement.injector.get(AlertController);
        spyOn(alert, 'create');
        fixture.detectChanges();
        expect(alert.create({title: 'title',subTitle: "sub-title",buttons: ['OK']})).toBeTruthy;
    });
    //Show Success Method
    it("Show Success Function test", function(){
        let alert= fixture.debugElement.injector.get(AlertController);
        spyOn(alert, 'create');
        fixture.detectChanges();
        expect(alert.create({title: 'title',subTitle: "sub-title",buttons: ['OK']})).toBeTruthy;
    });
});