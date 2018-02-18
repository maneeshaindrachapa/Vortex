import { Injectable } from '@angular/core';

//adding http module and rxjs module
import { Http, Response, Headers } from "@angular/http";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthServiceProvider {
  username:string;
  constructor(public http: Http) {
    
  }
  //set user
  public setUser(username){
    this.username=username;
  }

  //get user
  public getUser(){
    return this.username;
  }

  //login 
  public login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      var headers= new Headers();
      headers.append('Content-Type','application/X-www-form=urlencoded');
      return this.http.post("http://localhost/VortexApp/api/login.php",{"username":credentials.username,"password":credentials.password}).map(res=>res.json());
    }
  }

  //log out
  public logout() {
    return Observable.create(observer => {
      observer.next(true);
      observer.complete();
    });
  }
 
  //register
  public register(credentials) {
    if (credentials.email === null || credentials.password === null||credentials.firstname === null||credentials.lastname === null||credentials.email==null) {
      return Observable.throw("Please insert your credentials");
    } else {
      return this.http.post("http://localhost/VortexApp/api/signup.php",{"username":credentials.username,"firstname":credentials.firstname,"lastname":credentials.lastname,"password":credentials.password,"email":credentials.email,"organiztionId":1}).map(res=>res.json());
    }
  }

  //load organizations
  public loadOrganizations(){
    return this.http.get("http://localhost/VortexApp/api/organizationsLog.php").map(res=>res.json())
  }
  
  //getting voting ballots
  public getVotingBallots(){
    return this.http.get("http://localhost/VortexApp/api/getVotingBallots.php").map(res=>res.json());
  }

  //get userdetails
  public getUserDetails(username){
    return this.http.post("http://localhost/VortexApp/api/getUserDetails.php",{"username":username}).map(res=>res.json());
  }
}
