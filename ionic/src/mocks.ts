import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/of';
import { APP_BASE_HREF } from '@angular/common';

export class ConfigMock {
 
    public get(): any {
      return '';
    }
   
    public getBoolean(): boolean {
      return true;
    }
   
    public getNumber(): number {
      return 1;
    }
  }
   
  export class FormMock {
    public register(): any {
      return true;
    }
  }
   
  export class NavMock {
    public pop(): any {
      return new Promise(function(resolve: Function): void {
        resolve();
      });
    }
   
    public push(): any {
      return new Promise(function(resolve: Function): void {
        resolve();
      });
    
    }
   
    public getActive(): any {
      return {
        'instance': {
          'model': 'something',
        },
      };
    }
    public setRoot(): any {
      return true;
    }
  }
   
  export class PlatformMock {
    public ready(): any {
      return new Promise((resolve: Function) => {
        resolve();
      });
    }
  }
   
  export class MenuMock {
    public close(): any {
      return new Promise((resolve: Function) => {
        resolve();
      });
    }
    public open(): any {
      return new Promise((resolve: Function) => {
        resolve();
      });
    }
  }
  
  export class LoadingControllerMock {
      _getPortal(): any { return {} };
      create(options?: any) { 
          return new LoadingMock()
      };
  }

  class LoadingMock {
      present() { };
      dismiss() { };
      dismissAll() { };
  }
  
  export class AuthServiceMock {
    //mock data
    organizationsUA='[{"organizationID":"13","organizationRegNo":"1231235","organizationName":"company1","organizationAddress":"abc,abc,abc","organizationAccepted":"0"},{"organizationID":"14","organizationRegNo":"1231236","organizationName":"company3","organizationAddress":"lane1,lane2,srilanka","organizationAccepted":"0"}]';
    organizationID='1';
    username="maneesha";
    userDetails={"username":'maneesha','password':'test'};
    userDetails_={"username":"maneesha","password":"f5bb0c8de146c67b44babbf4e6584cc0","type":"2","accepted":"1"}
    userDetails__={"username":"maneesha","firstname":"maneesha","lastname":"indrachapa","email":"maneeshaindrachapa@gmail.com"}
    registerDetails={ "username": 'maneesha', "firstname": 'maneesha', "lastname": 'indrachapa', "password": '123123123', "email": 'maneeshaindrachapa@gmail.com', "organizationID": '1' };
    loadorganizations='[{"organizationID":"1","organizationRegNo":"01072921","organizationName":"Pizza Hut","organizationAddress":"No:77\/43,Isuru Pedesa,Mampitiya,Galle","organizationAccepted":"1"}]';
    regCodes_='4';
    unacceptedUsers='[{"id":"22","username":"employee1","firstname":"employeeFN","lastname":"employeeLN","password":"f5bb0c8de146c67b44babbf4e6584cc0","email":"employee1@gmail.com","type":"1","organizationID":"1","accepted":"0"}]';
    username_m='maneesha';
    organizationCred={ "username": 'manager', "firstname": 'managerFN', "lastname": 'managerLN', "password": '123123123', "email": 'manager@gmail.com', "organizationRegNo":'12312312',"organizationName":'organization1',"organizationAddress":'organization1,sri lanka'  }
    passwordChangeCode='1';
    passwordDetails={"currentPassword":'123123123',"newPassword":'123123123'};
    getEmployeeVotingBallots__=[{"votingballotID":"30","organizationID":"1","votingballotName":"Test 0","votingballotDescription":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sed augue sed enim venenatis egestas. Nulla sit amet lacus eget velit consequat convallis ac eget turpis. Morbi sed bibendum nulla, id vehicula ipsum.","startDate":"2018-03-01","startTime":"15:53:30","endDate":"2018-03-08","endTime":"07:53:30","image":"https:\/\/encrypted-tbn0.gstatic.com\/images?q=tbn:ANd9GcRJaDcCDuvFPckG9uPaFCkolwsRWZI6Av1DdwR0wQY_PpGEaVT_3A","noOfOptions":"3","publicKey":"902245","voterID":"45","username":"nipuna","votingoptionID":"35","privateKey":"7634fa43bf6b2a16d7508c17a7c7a9e0"}];
    votingballots__=[{"votingballotID":"36","organizationID":"1","votingballotName":"Test 1","votingballotDescription":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sed augue sed enim venenatis egestas. Nulla sit amet lacus eget velit consequat convallis ac eget turpis. Morbi sed bibendum nulla, id vehicula ipsum.","startDate":"2018-05-10","startTime":"06:29:15","endDate":"2018-05-13","endTime":"06:29:15","image":"https:\/\/static.angloinfo.com\/images\/assets\/original\/d7fedd2c\/fc8c\/d7fedd2c-fc8c-4caf-93c0-ab0faf87112c.jpg","noOfOptions":"2","publicKey":"511916"},{"votingballotID":"30","organizationID":"1","votingballotName":"Test 0","votingballotDescription":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sed augue sed enim venenatis egestas. Nulla sit amet lacus eget velit consequat convallis ac eget turpis. Morbi sed bibendum nulla, id vehicula ipsum.","startDate":"2018-03-01","startTime":"15:53:30","endDate":"2018-03-08","endTime":"07:53:30","image":"https:\/\/encrypted-tbn0.gstatic.com\/images?q=tbn:ANd9GcRJaDcCDuvFPckG9uPaFCkolwsRWZI6Av1DdwR0wQY_PpGEaVT_3A","noOfOptions":"3","publicKey":"902245"}];

    //methods
    public register(registerDetails):Observable<any> {
      return Observable.of(this.regCodes_);
    };
    public getUnacceptedUsers(username_m):Observable<any>{
      return Observable.of(this.unacceptedUsers);
    }
    public acceptUser(temp):Observable<any>{
      return Observable.of(true);
    }
    public setUser(username): any { return {} };
    public getUser():any {return this.username};
    public login(userDetails):Observable<any> {
      return Observable.of(this.userDetails_);
    };
    public getUnacceptedOrganizations():Observable<any> {
        return Observable.of(this.organizationsUA);
    };
    public acceptOrganizations(organizationID):Observable<any> {
      return Observable.of(this.organizationsUA);
    };
    public logout():Observable<any> {
      return Observable.of(true);
    };
    public loadOrganizations():Observable<any>{
      return Observable.of(this.loadorganizations);
    }
    public registerCompany(organizationCred):Observable<any>{
      return Observable.of(this.regCodes_);
    }
    public getUserDetails(username):Observable<any>{
      return Observable.of(this.userDetails__);
    }
    public changePassword(username, passwordDetails):Observable<any>{
      return Observable.of(this.passwordChangeCode);
    }
    public getEmployeeVotingBallots(username):Observable<any>{
      return Observable.of(this.getEmployeeVotingBallots__);
    }
    public getVotingBallots():Observable<any>{
      return Observable.of(this.votingballots__);
    }
  }

  export class EmpAddBallotMock{
    //mock variables
    ballotID='1';
    organizationID='1';
    getUsers_='[{"username":"nipuna","firstname":"Nipuna","lastname":"Upeksha","organizationID":"1"},{"username":"mn","firstname":"mn","lastname":"mn","organizationID":"1"}]';
    userAdded='1';

    //mock functions
    public setballotID(ballotID):any {return {}};
    public getballotID():any {return this.ballotID};
    public setOrganizationID(organizationID):any {return {}};
    public getUsers():Observable<any> {
      return Observable.of(this.getUsers_);
    };
    public addUserToBallot(username,ballotID):Observable<any> {
      return Observable.of(this.userAdded);
    };
    public removeUserFromBallot(username,ballotID):Observable<any> {
      return Observable.of(true);
    };
    public getVoters():Observable<any> {
      return Observable.of(this.getUsers_);
    };
  }

  export class ForgetPasswordMock{
    //mock variables
    email='maneeshaindrachapa@gmail.com';
    code='123123123';
    code_='0';
    password='123123123';

    //mock functions
    public setEmail(email):any{return {}};
    public getEmail():any {return this.email};
    public sendEmail(email):Observable<any> {
      return Observable.of(true);
    };
    public checkCode(email,code):Observable<any> {
      return Observable.of(this.code_);
    };
    public changePassword(email,password):Observable<any> {
      return Observable.of(true);
    };
  }

  export class BallotMock{
    //mock variables
    ballotDetails = { ballotName: 'test1', ballotDescription: 'test1-description', startDate: '2010-03-28', startTime: '06:30', holdingHours: '24', url: 'https://img/voting' };
    username='maneesha';
    votingballotid='1';
    votingOptionId='1';
    votingOptions=[{"votingoptionID":"53","votingballotID":"36","votingoptionName":"example 1"},{"votingoptionID":"54","votingballotID":"36","votingoptionName":"example 2"}];
    noOfOptions='5';
    ballotOptionsContaioner={'1':'maneesha','2':'indrachapa'}
    publicsecuritykey='12312312';
    privatesecuritykey='12312312';
    results=[1,0,1];

    //mock methods
    public setUser(username):any {return {}};
    public getUser():any {return this.username};
    public setvotingballotid(votingballotid): any {return {}};
    public getvotingballotid():any {return this.votingballotid};
    public getvotingOptions(votingballotid):Observable<any>{
      return Observable.of(this.votingOptions);
    }
    public getResults(votingballotid,votingOptionId):Observable<any>{
      return Observable.of(this.results);
    }
    public employeeAddVote(votingOptionId):Observable<any>{
      return Observable.of(true);
    }
    public createVotingBallot(ballotDetails, noOfOptions, ballotOptionsContainer):Observable<any>{
      return Observable.of(true);
    }
    public checkSecurity(votingballotid,publicsecuritykey,privatesecuritykey,username):Observable<any>{
      return Observable.of(true);
    }
    public sendMail(votingballotid,username):Observable<any>{
      return Observable.of(true);
    }
    public removeBallot(votingballotid):Observable<any>{
      return Observable.of(true);
    }
  }