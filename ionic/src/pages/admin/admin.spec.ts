import {} from 'jasmine';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement, Component } from '@angular/core';
import { By }           from '@angular/platform-browser';
import { IonicModule } from 'ionic-angular';
import { AdminPage } from './admin';
import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HttpModule } from '@angular/http';
import { ChartsModule } from 'ng2-charts';
import { BrowserModule } from '@angular/platform-browser';
import { NavMock, LoadingControllerMock, AuthServiceMock } from '../../mocks';
import { IonicStorageModule } from '@ionic/storage';
import { Storage } from '@ionic/storage';

let comp: AdminPage;
let fixture: ComponentFixture<AdminPage>;
let de: DebugElement;
let el: HTMLElement;
describe('Page:Admin Home Page', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AdminPage],
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
                IonicModule.forRoot(AdminPage),
                IonicStorageModule.forRoot()
            ]
        }).compileComponents();
    }));
 
    beforeEach(() => {
        fixture = TestBed.createComponent(AdminPage);
        comp    = fixture.componentInstance;
    });
 
    afterEach(() => {
        fixture.destroy();
        comp = null;
        de = null;
        el = null;
    });
 
    it('Admin home page is created', () => {
        expect(fixture).toBeTruthy();
        expect(comp).toBeTruthy();
    });

    //navigation testing
    it('Should go to Edit Profile Page', () => {
        let navCtrl = fixture.debugElement.injector.get(NavController);
        spyOn(navCtrl, 'push');
        fixture.detectChanges();
        de = fixture.debugElement.query(By.css('#editprofile'));
        de.triggerEventHandler('click', null);
        expect(navCtrl.push).toHaveBeenCalledWith('EditProfilePage');
    });
    it('Log out user', () => {
        let adminPg=fixture.debugElement.injector.get(AdminPage);
        expect(adminPg.logout()).toBeTruthy;
    });
    
    it('Should Accept an Organization',()=>{
        let adminPg=fixture.debugElement.injector.get(AdminPage);
        expect(adminPg.acceptOrganization("1")).toBeTruthy;
    });
});
