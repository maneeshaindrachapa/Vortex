import {} from 'jasmine';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement, Component } from '@angular/core';
import { By }           from '@angular/platform-browser';
import { IonicModule } from 'ionic-angular';
import { MyApp } from '../../app/app.component';
import { ForgetpasswordPage } from './forgetpassword';
import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { ForgetPasswordProvider } from '../../providers/forget-password/forget-password';
import { HttpModule } from '@angular/http';
import { ChartsModule } from 'ng2-charts';
import { BrowserModule } from '@angular/platform-browser';
import { NavMock, LoadingControllerMock, ForgetPasswordMock } from '../../mocks';

let comp: ForgetpasswordPage;
let fixture: ComponentFixture<ForgetpasswordPage>;
let de: DebugElement;
let el: HTMLElement;
describe('Page: Forgetpassword Page', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MyApp, ForgetpasswordPage],
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
        fixture = TestBed.createComponent(ForgetpasswordPage);
        comp    = fixture.componentInstance;
    });
 
    afterEach(() => {
        fixture.destroy();
        comp = null;
        de = null;
        el = null;
    });

    it('Forgetpassword page is created', () => {
        expect(fixture).toBeTruthy();
        expect(comp).toBeTruthy();
    });

    it("SendEmail Function test for a email entered", function(){
        let forgetPW=fixture.debugElement.injector.get(ForgetpasswordPage);
        forgetPW.email="test@gmail.com";
        expect(forgetPW.sendEmail()).toBeTruthy;
    });
    it("SendEmail Function test", function(){
        let forgetPW=fixture.debugElement.injector.get(ForgetpasswordPage);
        expect(forgetPW.sendEmail()).toBeTruthy;
    });

    it("setEmail Function test", function(){
        let forgetPasswordService = fixture.debugElement.injector.get(ForgetPasswordProvider);
        spyOn(forgetPasswordService, 'setEmail')
        fixture.detectChanges();

        expect(forgetPasswordService.setEmail("test@123.com")).toBeTruthy;
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
});