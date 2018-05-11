import {} from 'jasmine';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement, Component } from '@angular/core';
import { By }           from '@angular/platform-browser';
import { IonicModule } from 'ionic-angular';
import { EditProfilePage } from './edit-profile';
import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HttpModule } from '@angular/http';
import { ChartsModule } from 'ng2-charts';
import { BrowserModule } from '@angular/platform-browser';
import { NavMock, LoadingControllerMock, AuthServiceMock, BallotMock } from '../../mocks';
import { IonicStorageModule } from '@ionic/storage';
import { Storage } from '@ionic/storage';
import { BallotServiceProvider } from '../../providers/ballot-service/ballot-service';

let comp: EditProfilePage;
let fixture: ComponentFixture<EditProfilePage>;
let de: DebugElement;
let el: HTMLElement;
describe('Page:Edit Profile Page', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EditProfilePage],
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
                IonicModule.forRoot(EditProfilePage),
                IonicStorageModule.forRoot()
            ]
        }).compileComponents();
    }));
 
    beforeEach(() => {
        fixture = TestBed.createComponent(EditProfilePage);
        comp    = fixture.componentInstance;
    });
 
    afterEach(() => {
        fixture.destroy();
        comp = null;
        de = null;
        el = null;
    });
 
    it('Edit Profile page is created', () => {
        expect(fixture).toBeTruthy();
        expect(comp).toBeTruthy();
    });
    
    it('Change Password with all correct values',()=>{
        let temp=fixture.debugElement.injector.get(EditProfilePage);
        temp.passwordDetails.currentPassword='123123123';
        temp.passwordDetails.newPassword='123123123';
        temp.passwordDetails.confirmPassword='123123123'
        expect(temp.changePassword()).toBeTruthy;
    });
    it('Change Password with retype password error value',()=>{
        let temp=fixture.debugElement.injector.get(EditProfilePage);
        temp.passwordDetails.currentPassword='123123123';
        temp.passwordDetails.newPassword='123123123';
        temp.passwordDetails.confirmPassword='123123124'
        expect(temp.changePassword()).toBeTruthy;
    });

});
