import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider} from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: 'page-forgetpassword',
  templateUrl: 'forgetpassword.html',
})
export class ForgetpasswordPage {
  email="";
  constructor(public nav: NavController,private auth:AuthServiceProvider) {
  }

  sendEmail(){
    this.auth.sendEmail(this.email).subscribe(ballots => {
     },
     error => {
       console.log(error);
     });
  }
}
