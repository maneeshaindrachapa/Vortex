import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
  createSuccess = false;
  registerCredentials = { firstname: '',lastname:'', email:'', username:'', password: '' };
 
  constructor(public nav: NavController, private alertCtrl:AlertController, private auth:AuthServiceProvider) {
  }
  public register() {
    this.auth.register(this.registerCredentials).subscribe(success => {
      if (success) {
        this.createSuccess = true;
        this.showPopup("Success", "Account Created.");
      } else {
        this.showPopup("Error", "Problem While Creating Account.");
      }
    },
      error => {
        this.showPopup("Error", "Invaild User Details");
      });
  }
 
  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              this.nav.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }
  
}
