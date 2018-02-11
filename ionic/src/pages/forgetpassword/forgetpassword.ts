import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ForgetPasswordProvider} from '../../providers/forget-password/forget-password';

@IonicPage()
@Component({
  selector: 'page-forgetpassword',
  templateUrl: 'forgetpassword.html',
})
export class ForgetpasswordPage {
  email="";
  constructor(public nav: NavController,private fp:ForgetPasswordProvider) {
  }

  sendEmail(){
    this.fp.sendEmail(this.email).subscribe(mail => {
      this.nav.push("PasswordChangePage");
    },
     error => {
       console.log(error);
     });
  }
}
