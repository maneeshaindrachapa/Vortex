import {} from 'jasmine';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement, Component } from '@angular/core';
import { By }           from '@angular/platform-browser';
import { IonicModule } from 'ionic-angular';
import { ConfirmUserPage } from './confirm-user';
import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HttpModule } from '@angular/http';
import { ChartsModule } from 'ng2-charts';
import { BrowserModule } from '@angular/platform-browser';
import { NavMock, LoadingControllerMock, AuthServiceMock } from '../../mocks';
import { IonicStorageModule } from '@ionic/storage';
import { Storage } from '@ionic/storage';

let comp: ConfirmUserPage;
let fixture: ComponentFixture<ConfirmUserPage>;
let de: DebugElement;
let el: HTMLElement;
describe('Page:Confirm User Page', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ConfirmUserPage],
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
                IonicModule.forRoot(ConfirmUserPage),
                IonicStorageModule.forRoot()
            ]
        }).compileComponents();
    }));
 
    beforeEach(() => {
        fixture = TestBed.createComponent(ConfirmUserPage);
        comp    = fixture.componentInstance;
    });
 
    afterEach(() => {
        fixture.destroy();
        comp = null;
        de = null;
        el = null;
    });
 
    it('Confirm User page is created', () => {
        expect(fixture).toBeTruthy();
        expect(comp).toBeTruthy();
    });
    
    it('Should show unaccepted users to the Organization',()=>{
        let temp=fixture.debugElement.injector.get(ConfirmUserPage);
        expect(temp.getUnacceptedUsers()).toBeTruthy;
    });
    it('Should Accept user to the organization',()=>{
        let temp=fixture.debugElement.injector.get(ConfirmUserPage);
        expect(temp.acceptUser('temp')).toBeTruthy;
    });
});
