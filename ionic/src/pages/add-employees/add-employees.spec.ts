import {} from 'jasmine';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement, Component } from '@angular/core';
import { By }           from '@angular/platform-browser';
import { IonicModule } from 'ionic-angular';
import { MyApp } from '../../app/app.component';
import { AddEmployeesPage } from './add-employees';
import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { ChartsModule } from 'ng2-charts';
import { BrowserModule } from '@angular/platform-browser';
import { NavMock } from '../../mocks';
import { EmployeeAddBallotProvider } from '../../providers/employee-add-ballot/employee-add-ballot';

let comp: AddEmployeesPage;
let fixture: ComponentFixture<AddEmployeesPage>;
let de: DebugElement;
let el: HTMLElement;
describe('Page: AddEmployees Page', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MyApp, AddEmployeesPage],
            providers: [
                EmployeeAddBallotProvider,
                {provide: NavController, useClass: NavMock},
                AlertController,
                LoadingController
            ],
            imports: [
                BrowserModule,
                HttpModule,
                ChartsModule,
                IonicModule.forRoot(MyApp),
            ]
        }).compileComponents();
    }));
 
    beforeEach(() => {
        fixture = TestBed.createComponent(AddEmployeesPage);
        comp    = fixture.componentInstance;
    });
 
    afterEach(() => {
        fixture.destroy();
        comp = null;
        de = null;
        el = null;
    });
 
    it('AddEmployees page is created', () => {
        expect(fixture).toBeTruthy();
        expect(comp).toBeTruthy();
    });
    
    //services check
    it("Get Users Function test", function(){
        let empService = fixture.debugElement.injector.get(EmployeeAddBallotProvider);
        spyOn(empService, 'getUsers')
        fixture.detectChanges();
        expect(empService.getUsers()).toBeTruthy;
    });
    it("Add Users to the ballot Function test", function(){
        let empService = fixture.debugElement.injector.get(EmployeeAddBallotProvider);
        spyOn(empService, 'addUserToBallot')
        fixture.detectChanges();
        expect(empService.addUserToBallot('maneesha','1')).toBeTruthy;
    });
    it("Remove Users from the ballot Function test", function(){
        let empService = fixture.debugElement.injector.get(EmployeeAddBallotProvider);
        spyOn(empService, 'removeUserFromBallot')
        fixture.detectChanges();
        expect(empService.addUserToBallot('maneesha','1')).toBeTruthy;
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
