import { Injectable } from '@angular/core';

//adding http module and rxjs module
import { Http, Headers } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

@Injectable()
export class AuthServiceProvider {
  username: string;
  constructor(public http: Http, private storage:Storage) {
  }
  //set user
  public setUser(username) {
    this.username = username;
  }

  //get user
  public getUser() {
    return this.username;
  }

  //login 
  public login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      var headers = new Headers();
      headers.append('Content-Type', 'application/X-www-form=urlencoded');
      return this.http.post("https://vortexmobievotingapp.000webhostapp.com//vortex/api/login.php",JSON.stringify({ "username": credentials.username, "password": credentials.password })).map(res => res.json());
    }
  }

  //log out
  public logout() {
    this.storage.clear();
    this.storage.set("userDetails",{username:"",password:""});
    return Observable.create(observer => {
      observer.next(true);
      observer.complete();
    });
  }

  //register
  public register(credentials) {
      return this.http.post("https://vortexmobievotingapp.000webhostapp.com//vortex/api/signup.php", JSON.stringify({ "username": credentials.username, "firstname": credentials.firstname, "lastname": credentials.lastname, "password": credentials.password, "email": credentials.email, "organizationID": credentials.organizationID })).map(res => res.json());
  }

  //register company
  public registerCompany(credentials) {
      return this.http.post("https://vortexmobievotingapp.000webhostapp.com//vortex/api/registerCompany.php", JSON.stringify({ "username": credentials.username, "firstname": credentials.firstname, "lastname": credentials.lastname, "password": credentials.password, "email": credentials.email, "organizationRegNo":credentials.companyRegNo,"organizationName":credentials.companyName,"organizationAddress":credentials.address  })).map(res => res.json());
  }

  //load organizations
  public loadOrganizations() {
    return this.http.get("https://vortexmobievotingapp.000webhostapp.com//vortex/api/organizationsLog.php").map(res => res.json())
  }

  //getting voting ballots
  public getVotingBallots() {
    return this.http.get("https://vortexmobievotingapp.000webhostapp.com//vortex/api/getVotingBallots.php").map(res => res.json());
  }

  //get voting ballots for employee
  public getEmployeeVotingBallots(username) {
    return this.http.post("https://vortexmobievotingapp.000webhostapp.com//vortex/api/EmployeeVotings/getEmployeeVotingBallots.php", JSON.stringify({ "username": username })).map(res => res.json());
  }

  //get userdetails
  public getUserDetails(username) {
    return this.http.post("https://vortexmobievotingapp.000webhostapp.com//vortex/api/getUserDetails.php",JSON.stringify({ "username": username })).map(res => res.json());
  }

  //edit Profile
  public editProfile(username, userDetails) {
    return this.http.post("https://vortexmobievotingapp.000webhostapp.com//vortex/api/editProfile.php", JSON.stringify({ "username": username, "userDetails": userDetails })).map(res => res.json());
  }

  //change password
  public changePassword(username, passwordDetails) {
    return this.http.post("https://vortexmobievotingapp.000webhostapp.com//vortex/api/changePassword.php", JSON.stringify({ "username": username, "passwordDetails": passwordDetails })).map(res => res.json());
  }

  //getRequestNo
  public getRequestNo(username) {
    return this.http.post("https://vortexmobievotingapp.000webhostapp.com//vortex/api/getRequestNo.php",JSON.stringify({ "username": username})).map(res => res.json());
  }

  //get unaccepted users
  public getUnacceptedUsers(username) {
    return this.http.post("https://vortexmobievotingapp.000webhostapp.com//vortex/api/getUnacceptedUsers.php", JSON.stringify({ "username": username})).map(res => res.json());
  }

  //accept user
  public acceptUser(username) {
    return this.http.post("https://vortexmobievotingapp.000webhostapp.com//vortex/api/acceptUser.php", JSON.stringify({ "username": username})).map(res => res.json());
  }

  //get unaccepted organia=zations
  public getUnacceptedOrganizations(){
    return this.http.get("https://vortexmobievotingapp.000webhostapp.com//vortex/api/getUnacceptedOrganizations.php").map(res => res.json());
  }

  //accept an organization
  public acceptOrganizations(organizationID){
    return this.http.post("https://vortexmobievotingapp.000webhostapp.com//vortex/api/acceptOrganization.php", JSON.stringify({ "oraganizationID": organizationID})).map(res => res.json());
  }

}
