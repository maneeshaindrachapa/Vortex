import {} from 'jasmine';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement, Component } from '@angular/core';
import { By }           from '@angular/platform-browser';
import { IonicModule } from 'ionic-angular';
import { MyApp } from '../../app/app.component';
import { LoginPage } from '../login/login';
import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HttpModule } from '@angular/http';
import { ChartsModule } from 'ng2-charts';
import { BrowserModule } from '@angular/platform-browser';
import { SignUpPage } from '../sign-up/sign-up';
import { NavMock, AuthServiceMock, LoadingControllerMock } from '../../mocks';
import { IonicStorageModule } from '@ionic/storage';
import { Storage } from '@ionic/storage';

let comp: LoginPage;
let fixture: ComponentFixture<LoginPage>;
let de: DebugElement;
let el: HTMLElement;
describe('Page:Login Page', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MyApp, LoginPage],
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
        fixture = TestBed.createComponent(LoginPage);
        comp    = fixture.componentInstance;
    });
 
    afterEach(() => {
        fixture.destroy();
        comp = null;
        de = null;
        el = null;
    });
 
    it('Login page is created', () => {
        expect(fixture).toBeTruthy();
        expect(comp).toBeTruthy();
    });

    it('should show the logo', () => {
        fixture.detectChanges();
        const img: HTMLImageElement = fixture.debugElement.query(By.css('img')).nativeElement;
        expect(img).toBeTruthy;
    });

    xit("should show the login button",()=>{
        fixture.detectChanges();
        const de = fixture.debugElement.query(By.css('.submit-btn')).nativeElement;
        expect(de.textContent).toContain('Login');
    });
    
    //services check
    xdescribe("Login Function test",()=>{
        xit("navigate to the correct page",()=>{
            let loginFunc=fixture.debugElement.injector.get(LoginPage);
            expect(loginFunc.login()).toBeTruthy;
        });
    });

    //navigation testing
    it('Should go to SignUp Page', () => {
        let navCtrl = fixture.debugElement.injector.get(NavController);
        spyOn(navCtrl, 'push');
        fixture.detectChanges();
        de = fixture.debugElement.query(By.css('.register-btn'));
        de.triggerEventHandler('click', null);
        expect(navCtrl.push).toHaveBeenCalledWith('SignUpPage');
    }); 

    it('Should go to ForgetPassword Page', () => {
        let navCtrl = fixture.debugElement.injector.get(NavController);
        spyOn(navCtrl, 'push');
        fixture.detectChanges();
        de = fixture.debugElement.query(By.css('.forgetpassword-btn'));
        de.triggerEventHandler('click', null);
        expect(navCtrl.push).toHaveBeenCalledWith('ForgetpasswordPage');
    });  

    it('Should go to Contacts Page', () => {
        let navCtrl = fixture.debugElement.injector.get(NavController);
        spyOn(navCtrl, 'push');
        fixture.detectChanges();
        de = fixture.debugElement.query(By.css('.contactUs-btn'));
        de.triggerEventHandler('click', null);
        expect(navCtrl.push).toHaveBeenCalledWith('ContactUsPage');
    });
    
    //loading method
    it("Loading Function test", function(){
        let loading = fixture.debugElement.injector.get(LoadingController);
        spyOn(loading, 'create');
        fixture.detectChanges();

        de = fixture.debugElement.query(By.css('.submit-btn'));
        de.triggerEventHandler('click', null);
        expect(loading.create({content: 'Please wait...',dismissOnPageChange: true})).toBeTruthy;
    });
    //Show Error Method
    it("Show Error Function test", function(){
        let alert= fixture.debugElement.injector.get(AlertController);
        spyOn(alert, 'create');
        fixture.detectChanges();
        
        expect(alert.create({title: 'title',subTitle: "sub-title",buttons: ['OK']})).toBeTruthy;
    });
    //get user details from storage
    it("Get user details from storage", function(){
        let storage= fixture.debugElement.injector.get(Storage);
        spyOn(storage, 'get');
        fixture.detectChanges();

        expect(storage.get("username")).toBeTruthy;
        expect(storage.get("password")).toBeTruthy;

    });
    //set user details from storage
    it("Set user details from storage", function(){
        let storage= fixture.debugElement.injector.get(Storage);
        spyOn(storage, 'set');
        fixture.detectChanges();
        expect(storage.set("username","test1")).toBeTruthy;
        expect(storage.set("password","123123")).toBeTruthy;

    });
});
