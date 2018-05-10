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
import { NavMock, EmpAddBallotMock, LoadingControllerMock } from '../../mocks';
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
                {provide:EmployeeAddBallotProvider,useClass:EmpAddBallotMock},
                {provide: NavController, useClass: NavMock},
                {provide:AlertController,useClass:LoadingControllerMock},
                {provide:LoadingController,useClass:LoadingControllerMock}
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
    
    it("Add user to voting ballot test", function(){
        let addEmp=fixture.debugElement.injector.get(AddEmployeesPage);
        expect(addEmp.addUser("maneesha")).toBeTruthy;
    });
    it("Remove Users from voting Ballot test", function(){
        let addEmp=fixture.debugElement.injector.get(AddEmployeesPage);
        expect(addEmp.removeUser("maneesha")).toBeTruthy;
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
