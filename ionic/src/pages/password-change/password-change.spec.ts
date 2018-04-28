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
import { NavMock } from '../../mocks';

let comp: PasswordChangePage;
let fixture: ComponentFixture<PasswordChangePage>;
let de: DebugElement;
let el: HTMLElement;
describe('Page: PasswordChange Page', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MyApp, PasswordChangePage],
            providers: [
                ForgetPasswordProvider,
                {provide: NavController, useClass: NavMock},
                AlertController,
                LoadingController
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

    it("CheckCode Function test", function(){
        let forgetPasswordService = fixture.debugElement.injector.get(ForgetPasswordProvider);
        spyOn(forgetPasswordService, 'checkCode')
        fixture.detectChanges();

        de = fixture.debugElement.query(By.css('.code-btn'));
        de.triggerEventHandler('click', null);
        expect(forgetPasswordService.checkCode("test@123.com","123123")).toBeTruthy;
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
    //Show Success Method
    it("Show Success Function test", function(){
        let alert= fixture.debugElement.injector.get(AlertController);
        spyOn(alert, 'create');
        fixture.detectChanges();
        expect(alert.create({title: 'title',subTitle: "sub-title",buttons: ['OK']})).toBeTruthy;
    });
});