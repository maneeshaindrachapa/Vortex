import {} from 'jasmine';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement, Component } from '@angular/core';
import { By }           from '@angular/platform-browser';
import { IonicModule } from 'ionic-angular';
import { ContactUsPage } from './contact-us';
import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HttpModule } from '@angular/http';
import { ChartsModule } from 'ng2-charts';
import { BrowserModule } from '@angular/platform-browser';
import { NavMock, LoadingControllerMock, AuthServiceMock } from '../../mocks';
import { IonicStorageModule } from '@ionic/storage';
import { Storage } from '@ionic/storage';

let comp: ContactUsPage;
let fixture: ComponentFixture<ContactUsPage>;
let de: DebugElement;
let el: HTMLElement;
describe('Page:Contact Us Page', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ContactUsPage],
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
                IonicModule.forRoot(ContactUsPage),
                IonicStorageModule.forRoot()
            ]
        }).compileComponents();
    }));
 
    beforeEach(() => {
        fixture = TestBed.createComponent(ContactUsPage);
        comp    = fixture.componentInstance;
    });
 
    afterEach(() => {
        fixture.destroy();
        comp = null;
        de = null;
        el = null;
    });
 
    it('Contact us page is created', () => {
        expect(fixture).toBeTruthy();
        expect(comp).toBeTruthy();
    });
    
    it('Register an Organization',()=>{
        let temp=fixture.debugElement.injector.get(ContactUsPage);
        expect(temp.register()).toBeTruthy;
    });

    it('Help view in contaact us page',()=>{
        let temp=fixture.debugElement.injector.get(ContactUsPage);
        fixture.detectChanges();
        de = fixture.debugElement.query(By.css('#help'));
        de.triggerEventHandler('click', null);
        expect(temp.help()).toBeTruthy;
    });
});
