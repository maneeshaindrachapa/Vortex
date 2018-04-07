import { Injectable } from '@angular/core';

//adding http module and rxjs module
import { Http } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class ForgetPasswordProvider {
  email: string;
  constructor(public http: Http) {
  }
  //set email
  public setEmail(email) {
    this.email = email;
  }

  //getEmail
  public getEmail() {
    return this.email;
  }

  //forget password send email
  public sendEmail(email) {
    this.setEmail(email);
    return this.http.post("http://maneeshaindrachapamora.000webhostapp.com/vortex/api/forgetpassword/forgetpassword.php", JSON.stringify({ "email": email })).map(res => res.json());
  }

  //check code is correct
  public checkCode(email, code) {
    return this.http.post("http://maneeshaindrachapamora.000webhostapp.com/vortex/api/forgetpassword/checkCode.php", JSON.stringify({ "email": email, "code": code })).map(res => res.json());
  }

  //change password
  public changePassword(email, password) {
    return this.http.post("http://maneeshaindrachapamora.000webhostapp.com/vortex/api/forgetpassword/changePassword.php", JSON.stringify({ "email": email, "password": password })).map(res => res.json());
  }
}
