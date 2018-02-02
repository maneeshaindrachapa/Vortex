import { Injectable } from '@angular/core';

//adding http module and rxjs module
import { Http, Response, Headers } from "@angular/http";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthServiceProvider {

  constructor(public http: Http) {
    console.log('Hello AuthServiceProvider Provider');
  }

  //login 
  public login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      var headers= new Headers();
      headers.append('Content-Type','application/X-www-form=urlencoded');
      return this.http.post("http://localhost/carbon/api/login.php",{"username":credentials.username,"password":credentials.password}).map(res=>res.json());
    }
  }
 
  //register
  public register(credentials) {
    if (credentials.email === null || credentials.password === null||credentials.firstname === null||credentials.lastname === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return this.http.post("http://localhost/carbon/api/signup.php",{"username":credentials.username,"firstname":credentials.firstname,"lastname":credentials.lastname,"password":credentials.password}).map(res=>res.json());
    }
  }
  
}
