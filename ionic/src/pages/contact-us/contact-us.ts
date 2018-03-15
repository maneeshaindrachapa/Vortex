import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: 'page-contact-us',
  templateUrl: 'contact-us.html',
})
export class ContactUsPage {
  createSuccess = false;
  registerCompanyCredentials = { firstname: '', lastname: '', email: '', username: '', password: '',companyRegNo:'',companyName:'',address:'' };

  constructor(public nav: NavController,private alertCtrl: AlertController, private auth: AuthServiceProvider) {
  }
  //when user sign up
  public register() {
    this.auth.registerCompany(this.registerCompanyCredentials).subscribe(success => {
      if (success) {
        this.createSuccess = true;
        this.showPopup("Success", "Details are Sent.");
      } else {
        this.showPopup("Error", "Problem While Sending Details.");
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
