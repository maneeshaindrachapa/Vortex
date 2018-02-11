import { Injectable } from '@angular/core';

//adding http module and rxjs module
import { Http, Response, Headers } from "@angular/http";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class ForgetPasswordProvider {
  email:string;
  constructor(public http: Http) {    
  }
  //set email
  public setEmail(email){
    this.email=email;
  }

  //getEmail
  public getEmail(){
    return this.email;
  }

  //forget password send email
  public sendEmail(email){
    this.setEmail(email);
    return this.http.post("http://localhost/VortexApp/api/forgetPassword.php",{"email":email}).map(res=>res.json());
  }

}
